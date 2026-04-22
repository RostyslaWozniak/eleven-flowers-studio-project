import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { z } from "zod";

export const pickupDatAndTimeFormSchema = z.object({
  date: z.date({ errorMap: () => ({ message: "required" }) }),
  time: z.enum(DELIVERY_TIME_SLOTS, {
    errorMap: () => ({ message: "required" }),
  }),
  flowerMessage: z.string().max(1000).optional(),
});

export type PickupDatAndTimeFormSchema = z.infer<
  typeof pickupDatAndTimeFormSchema
>;
