import { schemaRequiredString, schemaSlug } from "@/lib/validation/schemas";
import { z } from "zod";

export const createCollectionSchema = z.object({
  translations: z.object({
    pl: z.object({
      name: schemaRequiredString.toLowerCase(),
      description: schemaRequiredString,
    }),
    en: z.object({
      name: schemaRequiredString.toLowerCase(),
      description: schemaRequiredString,
    }),
    ru: z.object({
      name: schemaRequiredString.toLowerCase(),
      description: schemaRequiredString,
    }),
  }),
  slug: schemaSlug,
  imageUrl: z.string().url(),
});
