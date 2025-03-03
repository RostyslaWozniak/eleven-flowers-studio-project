import { db } from "@/server/db";
import type { CartMutateSchema } from "./cart.types";

export class CartRepository {
  public static async findUnique(cartId: string | undefined) {
    return await db.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
  }

  public static async create({
    cartItemId,
    productId,
    size,
    quantity,
    price,
  }: CartMutateSchema & { price: number }) {
    return db.cart.create({
      data: {
        items: {
          create: {
            id: cartItemId,
            productId: productId,
            price,
            size: size,
            quantity: quantity,
          },
        },
      },
      include: { items: true },
    });
  }
}
