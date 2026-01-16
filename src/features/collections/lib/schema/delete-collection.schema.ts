import { z } from "zod";

export const deleteCollectionSchema = z.object({ id: z.string().uuid() });
