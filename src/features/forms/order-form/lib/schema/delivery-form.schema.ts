import { checkDelivery, DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { z } from "zod";
import { hasNoAvailableSlots, isSlotDisabled } from "../helpers/date";

export const deliveryFormSchema = z
  .object({
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
    date: z.date({ errorMap: () => ({ message: "required" }) }).optional(),
    time: z
      .enum(DELIVERY_TIME_SLOTS, {
        errorMap: () => ({ message: "required" }),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "required",
        path: ["date"],
      });
      return; // stop here, no point checking slots on undefined date
    }
    if (!data.time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "required",
        path: ["time"],
      });
      return;
    }

    if (hasNoAvailableSlots(data.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "not_available_date",
        path: ["date"],
      });
    }

    if (isSlotDisabled(data.time, data.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "not_available_time",
        path: ["time"],
      });
    }
  });

export type DeliveryFormSchema = z.infer<typeof deliveryFormSchema>;
