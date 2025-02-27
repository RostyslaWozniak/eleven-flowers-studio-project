import { z } from "zod";
import { checkDelivery } from "../utils/delivery";

export const DELIVERY_METHODS = ["delivery", "pickup"] as const;

export type DeliveryMethodsSlot = (typeof DELIVERY_METHODS)[number];

export const recipientFormSchema = z.object({
  name: z.string().trim().min(1, "required").max(50, "max"),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    // .regex(/^\+48 \d{3} \d{3} \d{3}$/, "invalid_phone_number")
    .max(20, "max"),
  address: z.string().trim().min(1, "required").max(50, "max"),
  city: z.string().trim().min(1, "required").max(50, "max"),
  postalCode: z
    .string()
    .trim()
    .superRefine((postalCode, ctx) => {
      if (!postalCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "required",
        });
      }
      const deliveryInfo = checkDelivery(postalCode);
      if (deliveryInfo.message === "invalid_postal_code") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: deliveryInfo.message,
        });
      }
      if (deliveryInfo.message === "postal_code_not_deliverable") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: deliveryInfo.message,
        });
      }
    }),
  flowerMessage: z.string().trim().max(255).optional(),
});

export type RecipientFormSchema = z.infer<typeof recipientFormSchema>;
