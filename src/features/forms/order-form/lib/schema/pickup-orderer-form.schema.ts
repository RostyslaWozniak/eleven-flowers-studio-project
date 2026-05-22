import { $Enums } from "@prisma/client";
import { z } from "zod";

export const pickupOrdererFormSchema = z.object({
  name: z.string().trim().max(50, "max").optional(),
  phone: z.string().min(1, { message: "required" }),
  email: z
    .string({ errorMap: () => ({ message: "required" }) })
    .email("invalid_email")
    .trim(),
  paymentStatus: z
    .enum([$Enums.PaymentStatus.PENDING, $Enums.PaymentStatus.PAID_ON_DELIVERY])
    .default($Enums.PaymentStatus.PENDING),
});

export type PickupOrdererFormSchema = z.infer<typeof pickupOrdererFormSchema>;
