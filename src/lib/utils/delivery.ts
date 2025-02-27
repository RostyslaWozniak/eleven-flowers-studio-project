// Postal Code Regex (XX-XXX)
const postalCodeSchema = /^\d{2}-\d{3}$/;

export const DELIVERY_TIME_SLOTS = [
  "10:00-13:00",
  "13:00-17:00",
  "17:00-20:00",
] as const;

export type DeliveryTimeSlot = (typeof DELIVERY_TIME_SLOTS)[number];

export const MIN_FREE_DELIVERY_PRICE = 500 * 100; // in cents

const DELIVERY_PRICE_ZONE_1 = 25;
const DELIVERY_PRICE_ZONE_2 = 55;
const DELIVERY_PRICE_ZONE_3 = 100;

// Delivery Zones Mapping
const deliveryZones: Record<number, { price: number | null; message: string }> =
  {
    1: { price: DELIVERY_PRICE_ZONE_1, message: "Delivery available" },
    2: { price: DELIVERY_PRICE_ZONE_1, message: "Delivery available" },
    3: { price: DELIVERY_PRICE_ZONE_1, message: "Delivery available" },
    4: { price: DELIVERY_PRICE_ZONE_2, message: "Delivery available" },
    5: { price: DELIVERY_PRICE_ZONE_3, message: "Delivery available" },
  };

// Check Delivery Function
export function checkDelivery(postalCode: string) {
  if (!postalCodeSchema.test(postalCode)) {
    return { price: null, message: "invalid_postal_code" };
  }

  const prefix = parseInt(postalCode.split("-")[0]!, 10); // Extract first two digits

  return (
    deliveryZones[prefix] ?? {
      price: null,
      message: "postal_code_not_deliverable",
    }
  );
}
