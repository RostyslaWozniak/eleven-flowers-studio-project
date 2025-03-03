import { z } from "zod";

export class ImageAdminSchema {
  public static delete = z.array(z.string());
}
