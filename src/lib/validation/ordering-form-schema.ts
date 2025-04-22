import { z } from "zod";
import { DELIVERY_TIME_SLOTS } from "../utils/delivery";

export const orderingFormSchema = z.object({
  name: z.string().trim().max(50, "max").optional(),
  phone: z.string().min(1, { message: "required" }),
  // .regex(/^\+48 \d{3} \d{3} \d{3}$/, "invalid_phone_number")
  email: z
    .string({ errorMap: () => ({ message: "required" }) })
    .email("invalid_email")
    .trim(),

  date: z.date({ errorMap: () => ({ message: "required" }) }),
  time: z.enum(DELIVERY_TIME_SLOTS, {
    errorMap: () => ({ message: "required" }),
  }),
  description: z.string().max(1000, "max").optional(),
});

export type OrderingFormSchema = z.infer<typeof orderingFormSchema>;
