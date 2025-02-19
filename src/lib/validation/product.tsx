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
