import type { Prisma } from "@prisma/client";
import type { DeliveryDetailsQueries } from "./delivery-details.queries";
import type { z } from "zod";
import type { DeliveryDetailsSchema } from "./delivery-details.schema";

export type CreateDeliveryDetailsSchema = z.infer<
  typeof DeliveryDetailsSchema.create
>;
export type DeliveryDetailsDTO = Prisma.DeliveryDetailsGetPayload<{
  select: ReturnType<typeof DeliveryDetailsQueries.selectFields>;
}>;
