import {
  DELIVERY_TIME_SLOTS,
  type DeliveryTimeSlot,
} from "@/lib/utils/delivery";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
const SLOT_BUFFER_HOURS = 2;

export function isSlotDisabled(slot: string, selectedDate: Date): boolean {
  const today = new Date();

  if (!isSameDay(selectedDate, today)) return false;

  if (slot === DELIVERY_TIME_SLOTS[0]) return true;

  const startHour = parseInt(slot.split(":")[0]!, 10);
  const slotStart = new Date();
  slotStart.setHours(startHour, 0, 0, 0);

  const bufferFromNow = new Date(
    today.getTime() + SLOT_BUFFER_HOURS * 60 * 60 * 1000,
  );

  return slotStart < bufferFromNow;
}

export function hasNoAvailableSlots(date: Date): boolean {
  return DELIVERY_TIME_SLOTS.every((slot) => isSlotDisabled(slot, date));
}

export function getFirstAvailableSlot(date: Date): DeliveryTimeSlot {
  return (
    DELIVERY_TIME_SLOTS.find((slot) => !isSlotDisabled(slot, date)) ??
    DELIVERY_TIME_SLOTS[0]
  );
}
export function getFirstAvailableDate(): Date {
  const date = new Date();
  while (hasNoAvailableSlots(date)) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}
