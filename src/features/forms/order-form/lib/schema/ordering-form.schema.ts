import { z } from "zod";

export const ordererFormSchema = z.object({
  name: z.string().trim().max(50, "max").optional(),
  phone: z.string().min(1, { message: "required" }),
  email: z
    .string({ errorMap: () => ({ message: "required" }) })
    .email("invalid_email")
    .trim(),
  description: z.string().max(1000, "max").optional(),
});

export type OrdererFormSchema = z.infer<typeof ordererFormSchema>;
