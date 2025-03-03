import { z } from "zod";

export class CartItemSchema {
  public static create = z.object({
    cartId: z.string().uuid(),
    cartItemId: z.string().uuid(),
    price: z.number(),
    productId: z.string().uuid(),
    quantity: z.number().min(1),
    size: z.string(),
  });
}
