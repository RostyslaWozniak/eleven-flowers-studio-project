import { addCollectionSchema } from "@/lib/validation/collection";
import { z } from "zod";

export class CollectionAdminSchema {
  public static create = addCollectionSchema;

  public static update = addCollectionSchema.extend({ id: z.string() });

  static delete = z.object({ id: z.string() });
}
