// Postal Code Regex (XX-XXX)
export const POSTAL_CODE_SCHEMA = /^\d{2}-\d{3}$/;

export const ORDER_METHODS = ["delivery", "pickup"] as const;

export const DELIVERY_TIME_SLOTS = [
  "10:00-13:00",
  "13:00-17:00",
  "17:00-20:00",
] as const;

export type DeliveryTimeSlot = (typeof DELIVERY_TIME_SLOTS)[number];

export const MIN_FREE_DELIVERY_PRICE_IN_CENTS = 500 * 100;

// prices in cents
const DELIVERY_PRICE_ZONE_1 = 25 * 100;
const DELIVERY_PRICE_ZONE_2 = 55 * 100;
const DELIVERY_PRICE_ZONE_3 = 100 * 100;
const DELIVERY_AVAILABLE_MESSAGE = "delivery_available";

// Delivery Zones Mapping
export const DELIVERY_ZONES: Record<
  number,
  { price: number; message: string }
> = {
  1: { price: DELIVERY_PRICE_ZONE_1, message: DELIVERY_AVAILABLE_MESSAGE },
  2: { price: DELIVERY_PRICE_ZONE_1, message: DELIVERY_AVAILABLE_MESSAGE },
  3: { price: DELIVERY_PRICE_ZONE_1, message: DELIVERY_AVAILABLE_MESSAGE },
  4: { price: DELIVERY_PRICE_ZONE_2, message: DELIVERY_AVAILABLE_MESSAGE },
  5: { price: DELIVERY_PRICE_ZONE_3, message: DELIVERY_AVAILABLE_MESSAGE },
};

// Check Delivery Function
export function checkDelivery(postalCode: string) {
  if (!POSTAL_CODE_SCHEMA.test(postalCode)) {
    return { price: null, message: "invalid_postal_code" };
  }

  const prefix = parseInt(postalCode.split("-")[0]!, 10); // Extract first two digits

  return (
    DELIVERY_ZONES[prefix] ?? {
      price: null,
      message: "postal_code_not_deliverable",
    }
  );
}
