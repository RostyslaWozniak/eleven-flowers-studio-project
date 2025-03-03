import type { $Enums, Prisma } from "@prisma/client";
import type { OrderQueries } from "./order.queries";
import type { z } from "zod";
import type { OrderSchema } from "./order.schema";

export type OrderFromDb = Prisma.OrderGetPayload<{
  select: ReturnType<typeof OrderQueries.selectFields>;
}>;

export type OrderDTO = {
  id: string;
  contactInfoId: string;
  paymentStatus: $Enums.PaymentStatus;
  totalPrice: number;
  deliveryPrice: number;
  orderItems: {
    id: string;
    productName: string;
    slug: string;
    price: number | null;
    imageUrl: string;
    size: string;
    quantity: number;
  }[];
};

export type CreateOrderWithDetailsSchema = z.infer<
  typeof OrderSchema.createWithDetails
>;
