import { $Enums } from "@prisma/client";
import { z } from "zod";

export const changeProductStatusSchema = z.object({
  id: z.string(),
  status: z.nativeEnum($Enums.ProductStatus),
});

export type ChangeProductStatusSchema = z.infer<
  typeof changeProductStatusSchema
>;
