import { z } from "zod";

export const DELIVERY_TIME_SLOTS = [
  "10:00-13:00",
  "13:00-17:00",
  "17:00-20:00",
  "22:00-23:00",
] as const;

export type DeliveryTimeSlot = (typeof DELIVERY_TIME_SLOTS)[number];

export const DELIVERY_METHODS = ["delivery", "pickup"] as const;

export type DeliveryMethodsSlot = (typeof DELIVERY_METHODS)[number];

export const MAX_AVAILABLE_DAYS = 14; // Maximum available days from the current date

export const ADDITIONAL_TIME_HOURS = 2; // Additional buffer time in hours

const ADDITIONAL_TIME_IN_MS = ADDITIONAL_TIME_HOURS * 60 * 60 * 1000; // Additional buffer time in milliseconds

export const dateAndMethodFormSchema = z
  .object({
    date: z.date(),
    time: z.enum(DELIVERY_TIME_SLOTS, {
      description: "Select time",
      errorMap: () => ({ message: "Select time" }),
    }),
    deliveryMethod: z.enum(DELIVERY_METHODS),
    description: z.string().optional(),
  })
  .superRefine(({ date, time }, ctx) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const selectedHour = parseInt(time.split("-")[0]!); // Extract the first hour in range

    // ✅ Convert selected date + selected hour into milliseconds
    selectedDate.setHours(selectedHour, 0, 0, 0);
    const selectedTimeMs = selectedDate.getTime();

    // ✅ Get current time + 2 hours in milliseconds
    const futureTimeMs = now.getTime() + ADDITIONAL_TIME_IN_MS;

    if (selectedTimeMs < futureTimeMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["date"],
        message: "Date must be in the future",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["time"],
        message: "Time must be in the future",
      });
    }
  });

export type DateAndMethodFormSchema = z.infer<typeof dateAndMethodFormSchema>;

// Helper functions

export const getClosestAvailableDateAndTime = (currentTime: Date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Check if any time slots are available today
  const availableToday = DELIVERY_TIME_SLOTS.some(
    (slot) => !isTimeSlotDisabled(slot, today, currentTime),
  );

  if (availableToday) {
    // If today has available slots, set the date to today and the first available time
    const firstAvailableSlotToday = DELIVERY_TIME_SLOTS.find(
      (slot) => !isTimeSlotDisabled(slot, today, currentTime),
    );

    if (!firstAvailableSlotToday) {
      return { date: today, time: DELIVERY_TIME_SLOTS[0] };
    }
    return { date: today, time: firstAvailableSlotToday };
  } else {
    // If no slots are available today, set the date to tomorrow and the first time slot
    return { date: tomorrow, time: DELIVERY_TIME_SLOTS[0] };
  }
};

export const isTimeSlotDisabled = (
  timeSlot: string,
  selectedDate: Date,
  currentTime: Date,
) => {
  if (!selectedDate) return false;

  const today = new Date();
  const isToday = selectedDate.toDateString() === today.toDateString();

  if (!isToday) return false;

  const [startTime] = timeSlot.split("-");
  if (!startTime) return false;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  if (!startHour) return false;

  const slotTime = new Date();

  slotTime.setHours(startHour - ADDITIONAL_TIME_HOURS, startMinute, 0, 0);

  return slotTime <= currentTime;
};
