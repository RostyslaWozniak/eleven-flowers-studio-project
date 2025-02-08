import { z } from "zod";

export const deliveryTimeArray = [
  "10:00-13:00",
  "13:00-17:00",
  "17:00-20:00",
] as const;

export const deliveryMethods = ["delivery", "pickup"] as const;

// set additional time to 2 hours
export const ADDITIONAL_TIME = 2;

const ADDITIONAL_TIME_IN_MILISECONDS = ADDITIONAL_TIME * 60 * 60 * 1000; // 2 hours in milliseconds

export const dateAndMethodFormSchema = z
  .object({
    date: z.date(),
    time: z.enum(deliveryTimeArray),
    deliveryMethod: z.enum(deliveryMethods),
    description: z.string().optional(),
  })
  .superRefine(({ date, time }, ctx) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const selectedHour = parseInt(time.split("-")[0]!); // Extract the first hour in range

    // ✅ Convert selected date + selected hour into milliseconds
    selectedDate.setHours(selectedHour, 0, 0, 0);
    console.log(selectedDate);
    const selectedTimeMs = selectedDate.getTime();

    // ✅ Get current time + 2 hours in milliseconds
    const futureTimeMs = now.getTime() + ADDITIONAL_TIME_IN_MILISECONDS;

    if (selectedTimeMs < futureTimeMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["time"],
        message: "Time must be in the future",
      });
    }
  });

export type DateAndMethodFormSchema = z.infer<typeof dateAndMethodFormSchema>;
