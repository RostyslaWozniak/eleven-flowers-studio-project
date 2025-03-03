import { z } from "zod";

export class OrderAdminSchema {
  public static delete = z.object({ id: z.string() });
}
