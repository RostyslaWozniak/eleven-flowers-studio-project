import { addProductSchema } from "@/lib/validation/product";
import { $Enums } from "@prisma/client";
import { z } from "zod";

export class ProductAdminSchema {
  public static getAll = z.object({
    take: z.number().optional(),
    skip: z.number().optional(),
  });
  public static create = addProductSchema;
  public static update = addProductSchema.extend({ id: z.string() });
  public static delete = z.object({ id: z.string() });

  public static changeStatus = z.object({
    id: z.string(),
    status: z.enum([
      $Enums.ProductStatus.AVAILABLE,
      $Enums.ProductStatus.DISCONTINUED,
      $Enums.ProductStatus.OUT_OF_STOCK,
    ]),
  });
}
