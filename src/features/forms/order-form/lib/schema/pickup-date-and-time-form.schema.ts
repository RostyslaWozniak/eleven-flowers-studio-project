import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { z } from "zod";
import { hasNoAvailableSlots, isSlotDisabled } from "../helpers/date";

export const pickupDatAndTimeFormSchema = z
  .object({
    date: z.date({ errorMap: () => ({ message: "required" }) }),
    time: z.enum(DELIVERY_TIME_SLOTS, {
      errorMap: () => ({ message: "required" }),
    }),
    flowerMessage: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
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
