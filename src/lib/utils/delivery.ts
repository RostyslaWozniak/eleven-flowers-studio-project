// Postal Code Regex (XX-XXX)
const postalCodeSchema = /^\d{2}-\d{3}$/;

// Delivery Zones Mapping
const deliveryZones: Record<number, { price: number | null; message: string }> =
  {
    0: { price: 30, message: "Delivery available (Zone 0)" },
    1: { price: 30, message: "Delivery available (Zone 1)" },
    2: { price: 50, message: "Delivery available (Zone 2)" },
    3: { price: 50, message: "Delivery available (Zone 2)" }, // Example of blocked zone
    4: { price: 50, message: "Delivery available (Zone 4)" },
  };

// Check Delivery Function
export function checkDelivery(postalCode: string) {
  if (!postalCodeSchema.test(postalCode)) {
    return { price: null, message: "Invalid postal code format" };
  }

  const prefix = parseInt(postalCode.split("-")[0]!, 10); // Extract first two digits

  return (
    deliveryZones[prefix] ?? { price: null, message: "Delivery not available" }
  );
}
