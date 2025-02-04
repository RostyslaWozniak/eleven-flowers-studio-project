import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");
const optionalString = z.string().trim().optional();

export const addProductSchema = z.object({
  slug: requiredString,
  collection: optionalString,
  translations: z.object({
    pl: z.object({
      name: requiredString,
      description: requiredString,
    }),
    en: z.object({
      name: requiredString,
      description: requiredString,
    }),
    ru: z.object({
      name: requiredString,
      description: requiredString,
    }),
  }),
  prices: z.object({
    small: z.coerce
      .number({ message: "Price must be a number! Example: 9.99" })
      .min(1, "Price is required!")
      .optional(),
    medium: z.coerce
      .number({ message: "Price must be a number! Example: 9.99" })
      .min(1, "Price is required!")
      .optional(),
    large: z.coerce
      .number({ message: "Price must be a number! Example: 9.99" })
      .min(1, "Price is required!")
      .optional(),
  }),
  images: z.array(z.string().url()),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
