import type { Prisma } from "@prisma/client";
import type { OrderAdminQueries } from "./order-admin.query";
import type { OrderAdminSchema } from "./order-admin.schema";
import type { z } from "zod";

export type OrderAdminFromDb = Prisma.OrderGetPayload<{
  select: ReturnType<typeof OrderAdminQueries.selectFields>;
}>;

export type OrderAdminDTO = OrderAdminFromDb;

export type OrderAdminGetAllSchema = z.infer<typeof OrderAdminSchema.getAll>;
