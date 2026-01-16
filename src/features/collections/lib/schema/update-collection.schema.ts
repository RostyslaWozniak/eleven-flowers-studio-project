import { z } from "zod";
import { createCollectionSchema } from "./create-collection.schema";

export const updateCollectionSchema = createCollectionSchema.extend({
  id: z.string().uuid(),
});
