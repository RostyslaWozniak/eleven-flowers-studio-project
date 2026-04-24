import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { z } from "zod";
import { hasNoAvailableSlots, isSlotDisabled } from "../helpers/date";

export const pickupDatAndTimeFormSchema = z
  .object({
    date: z.date({ errorMap: () => ({ message: "required" }) }).optional(),
    time: z
      .enum(DELIVERY_TIME_SLOTS, {
        errorMap: () => ({ message: "required" }),
      })
      .optional(),
    flowerMessage: z.string().max(1000).optional(),
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

export type PickupDatAndTimeFormSchema = z.infer<
  typeof pickupDatAndTimeFormSchema
>;
