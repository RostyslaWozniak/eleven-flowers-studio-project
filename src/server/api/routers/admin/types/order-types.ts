import { type Prisma } from "@prisma/client";
import { type ADMIN_ORDER_SELECT_FIELDS } from "../services/orders-queries";

export type PrismaGetAdminOrders = Prisma.OrderGetPayload<{
  select: typeof ADMIN_ORDER_SELECT_FIELDS;
}>;

export type AdminOrderDto = PrismaGetAdminOrders;
