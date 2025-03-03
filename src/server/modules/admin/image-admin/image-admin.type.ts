import type { z } from "zod";
import type { ImageAdminSchema } from "./image-admin.schema";

export type DeleteImageAdminSchema = z.infer<typeof ImageAdminSchema.delete>;
