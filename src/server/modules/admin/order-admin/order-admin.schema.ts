import { z } from "zod";

export class OrderAdminSchema {
  public static getAll = z.object({
    take: z.number().optional(),
    skip: z.number().optional(),
  });
  public static delete = z.object({ id: z.string() });
}
