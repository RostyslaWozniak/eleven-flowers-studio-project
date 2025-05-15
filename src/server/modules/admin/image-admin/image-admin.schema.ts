import { z } from "zod";

export class ImageAdminSchema {
  public static getAllImages = z
    .object({
      take: z.number().optional().default(12),
      skip: z.number().optional().default(0),
    })
    .optional();
  public static delete = z.array(z.string());
}
