import type { Prisma } from "@prisma/client";
import type { AddressQueries } from "./address.queries";
import type { z } from "zod";
import type { AddressSchema } from "./address.schema";

export type CreateAddressSchema = z.infer<typeof AddressSchema.create>;
export type AddressDTO = Prisma.AddressGetPayload<{
  select: ReturnType<typeof AddressQueries.selectFields>;
}>;
