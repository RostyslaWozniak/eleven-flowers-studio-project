import { z } from "zod";

export class CartSchema {
  public static mutateCart = z.object({
    cartItemId: z.string(),
    productId: z.string(),
    size: z.string(),
    quantity: z.number().min(1),
  });
}
