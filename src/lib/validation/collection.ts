import { z } from "zod";
import { schemaRequiredString, schemaSlug } from "./schemas";

export const addCollectionSchema = z.object({
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

export type AddCollectionSchema = z.infer<typeof addCollectionSchema>;
