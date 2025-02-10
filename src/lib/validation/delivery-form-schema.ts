import { z } from "zod";
import { checkDelivery } from "../utils/delivery";

export const deliveryFormSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  email: z
    .string({ errorMap: () => ({ message: "required" }) })
    .email("invalid_email")
    .trim(),
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
});

export type DeliveryFormSchema = z.infer<typeof deliveryFormSchema>;
