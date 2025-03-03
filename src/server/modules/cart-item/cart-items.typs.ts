import type { z } from "zod";
import type { CartItemSchema } from "./cart-item.schema";
import { type Prisma } from "@prisma/client";
import { type CartItemQueries } from "./cart-item.queries";

export type CartItemFromDb = Prisma.CartItemGetPayload<{
  select: ReturnType<typeof CartItemQueries.selectFields>;
}>;

export type CartItemDTO = {
  id: string;
  productId: string;
  productName: string;
  slug: string;
  price: number | null;
  size: string;
  imageUrl: string;
  quantity: number;
};

export type CreateCartItemSchema = z.infer<typeof CartItemSchema.create>;
