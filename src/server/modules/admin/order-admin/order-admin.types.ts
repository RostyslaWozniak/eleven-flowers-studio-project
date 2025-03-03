import type { Prisma } from "@prisma/client";
import type { OrderAdminQueries } from "./order-admin.query";

export type OrderAdminFromDb = Prisma.OrderGetPayload<{
  select: ReturnType<typeof OrderAdminQueries.selectFields>;
}>;

export type OrderAdminDTO = OrderAdminFromDb;
