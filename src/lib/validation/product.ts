import { z } from "zod";
import { schemaRequiredString, schemaSlug } from "./schemas";

export const addProductSchema = z.object({
  slug: schemaSlug,
  collectionSlug: schemaSlug,
  translations: z.object({
    pl: z.object({
      name: schemaRequiredString,
      description: schemaRequiredString,
    }),
    en: z.object({
      name: schemaRequiredString,
      description: schemaRequiredString,
    }),
    ru: z.object({
      name: schemaRequiredString,
      description: schemaRequiredString,
    }),
  }),
  images: z.array(z.string().url()),
  prices: z
    .array(
      z.object({
        size: z.string().min(1),
        price: z.coerce.number().min(1),
      }),
    )
    .nonempty({ message: "Product is required" }),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
