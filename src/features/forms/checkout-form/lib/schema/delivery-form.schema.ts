import { checkDelivery, DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { z } from "zod";

export const deliveryFormSchema = z.object({
  address: z.string().min(5, "required").max(50, "max"),
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
  date: z.date({ errorMap: () => ({ message: "required" }) }),
  time: z.enum(DELIVERY_TIME_SLOTS, {
    errorMap: () => ({ message: "required" }),
  }),
});

export type DeliveryFormSchema = z.infer<typeof deliveryFormSchema>;
