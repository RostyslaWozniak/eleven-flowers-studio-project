import { z } from "zod";

export const deliveryTimeArray = [
  "10:00-13:00",
  "13:00-17:00",
  "17:00-20:00",
  "21:00-23:00",
] as const;

export const deliveryMethods = ["delivery", "pickup"] as const;

const ADDITIONAL_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const dateAndMethodFormSchema = z
  .object({
    date: z.date(),
    time: z.enum(deliveryTimeArray),
    deliveryMethod: z.enum(deliveryMethods),
    description: z.string().optional(),
  })
  .refine(
    ({ date, time }) => {
      const now = new Date();
      const selectedDate = new Date(date);
      const selectedHour = parseInt(time.split("-")[0]!); // Extract the first hour in range

      // ✅ Convert selected date + selected hour into milliseconds
      selectedDate.setHours(selectedHour, 0, 0, 0);
      const selectedTimeMs = selectedDate.getTime();

      // ✅ Get current time + 2 hours in milliseconds
      const futureTimeMs = now.getTime() + ADDITIONAL_TIME;

      // ✅ Check if selected time is at least 2 hours ahead of current time
      return selectedTimeMs > futureTimeMs;
    },
    {
      message: "Date and time must be in the future",
      path: ["date"],
    },
  );

export type DateAndMethodFormSchema = z.infer<typeof dateAndMethodFormSchema>;
