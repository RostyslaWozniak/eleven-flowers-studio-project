import { db } from "@/server/db";
import type { CartItemFromDb, CreateCartItemSchema } from "./cart-items.typs";
import { CartItemQueries } from "./cart-item.queries";
import { type Locale } from "@/i18n/routing";
import { type Prisma } from "@prisma/client";

export class CartItemRepository {
  public static getAllByCartId = async (
    cartId: string,
    locale: Locale,
  ): Promise<CartItemFromDb[]> => {
    return await db.cartItem.findMany({
      where: { cartId: cartId },
      select: CartItemQueries.selectFields(locale),
    });
  };

  public static create = async ({
    cartId,
    cartItemId,
    price,
    productId,
    quantity,
    size,
  }: CreateCartItemSchema) => {
    return await db.cartItem.create({
      data: {
        id: cartItemId,
        cartId: cartId,
        productId: productId,
        size: size,
        quantity: quantity,
        price: price,
      },
    });
  };

  public static async update(
    cartItemId: string,
    data: Prisma.CartItemUpdateInput,
  ) {
    return await db.cartItem.update({
      where: { id: cartItemId },
      data,
    });
  }

  public static async remove(cartItemId: string) {
    return await db.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  public static async removeAllByCartId(cartId: string) {
    return await db.cartItem.deleteMany({
      where: { cartId: cartId },
    });
  }
}
