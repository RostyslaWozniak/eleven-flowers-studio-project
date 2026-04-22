import { z } from "zod";

export const recipientFormSchema = z.object({
  name: z
    .string({ message: "required" })
    .trim()
    .min(1, "required")
    .max(50, "max"),
  phone: z
    .string({ message: "required" })
    .min(1, "required")
    .regex(/^(\+48\s?)?(\d{3}[\s-]?){2}\d{3}$/, "invalid_phone_number"),

  flowerMessage: z.string().trim().max(255, "max").optional(),
});

export type RecipientFormSchema = z.infer<typeof recipientFormSchema>;
