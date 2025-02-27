import { z } from "zod";
import {
  schemaOptionalString,
  schemaRequiredString,
  schemaSlug,
} from "./schemas";

export const addProductSchema = z.object({
  slug: schemaSlug,
  collection: schemaOptionalString,
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
