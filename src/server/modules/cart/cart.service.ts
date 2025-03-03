import type { CartMutateSchema } from "./cart.types";
import type { NextRequest } from "next/server";
import { ProductService } from "../product/product.service";
import {
  getCookieValue,
  CART_COOKIE_NAME,
  setCookieValue,
  getLocaleFromCookie,
} from "@/lib/utils/cookies";
import { CartRepository } from "./cart.repository";
import { CartItemService } from "../cart-item/cart-item.service";
import { TRPCError } from "@trpc/server";
import type { CartItemDTO } from "../cart-item/cart-items.typs";

export class CartService {
  public static async mutateCart(
    req: NextRequest,
    resHeaders: Headers,
    { cartItemId, productId, size, quantity }: CartMutateSchema,
  ): Promise<{ cartId: string; message: string }> {
    const product = await ProductService.getByIdOrThrow(productId);

    const productPrice = product.prices.find(
      (price) => price.size === size,
    )?.price;
    if (!productPrice)
      throw new TRPCError({ code: "NOT_FOUND", message: "Price is undefined" });

    // Step 1: Check if cart ID is provided
    const cartId = getCookieValue(req, CART_COOKIE_NAME) ?? undefined;
    const cart = cartId ? await CartRepository.findUnique(cartId) : null;

    // Step 2: If cart doesn't exist, create a new one
    if (!cart) {
      const newCart = await CartRepository.create({
        cartItemId,
        productId,
        size,
        quantity,
        price: productPrice,
      });
      setCookieValue(resHeaders, CART_COOKIE_NAME, newCart.id);
      return { cartId: newCart.id, message: "New cart created with item." };
    }

    // Step 3: Check if cart item exists
    const existingCartItem = cart.items.find((item) => {
      return item.id === cartItemId;
    });

    if (existingCartItem) {
      // Step 4: Update quantity if item already exists
      await CartItemService.update(cartItemId, { quantity });
      setCookieValue(resHeaders, CART_COOKIE_NAME, cart.id);
      return { cartId: cart.id, message: "Cart item updated." };
    } else {
      // Step 5: Create a new cart item if not exists
      await CartItemService.create({
        cartId: cart.id,
        cartItemId,
        price: productPrice,
        productId,
        quantity,
        size,
      });
      setCookieValue(resHeaders, CART_COOKIE_NAME, cart.id);
      return { cartId: cart.id, message: "New cart item added." };
    }
  }

  public static async getCartItems(req: NextRequest): Promise<CartItemDTO[]> {
    const cartId = getCookieValue(req, CART_COOKIE_NAME);
    const locale = getLocaleFromCookie(req);
    if (!cartId) return [];

    return await CartItemService.getAllByCartId(cartId, locale);
  }

  public static async removeCartItem(cartItemId: string) {
    return await CartItemService.remove(cartItemId);
  }
}
