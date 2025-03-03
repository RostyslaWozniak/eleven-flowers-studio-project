import { CartItemRepository } from "./cart-item.repository";
import type {
  CartItemDTO,
  CartItemFromDb,
  CreateCartItemSchema,
} from "./cart-items.typs";
import { type Prisma } from "@prisma/client";
import { type Locale } from "@/i18n/routing";

export class CartItemService {
  public static getAllByCartId = async (
    cartId: string,
    locale: Locale,
  ): Promise<CartItemDTO[]> => {
    const cartItems = await CartItemRepository.getAllByCartId(cartId, locale);
    return this.mapManyCartItemToDTO(cartItems);
  };

  public static create = async (input: CreateCartItemSchema) => {
    return await CartItemRepository.create(input);
  };

  public static update = async (
    cartItemId: string,
    data: Prisma.CartItemUpdateInput,
  ) => {
    return await CartItemRepository.update(cartItemId, data);
  };

  public static remove = async (cartItemId: string) => {
    return await CartItemRepository.remove(cartItemId);
  };

  public static removeAllByCartId = async (cartId: string) => {
    return await CartItemRepository.removeAllByCartId(cartId);
  };

  private static mapManyCartItemToDTO = (
    cartItems: CartItemFromDb[],
  ): CartItemDTO[] => {
    return cartItems.map((item) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.translations[0]?.name ?? "No name",
      slug: item.product.slug,
      price: item.price,
      imageUrl:
        item.product.images[0]?.url ?? "/images/bouquet-placeholder.jpg",
      size: item.size,
      quantity: item.quantity,
    }));
  };
}
