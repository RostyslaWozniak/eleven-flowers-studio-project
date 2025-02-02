export function formatPrice(price: number | null) {
  if (price == null) return "N/A";
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price / 100);
}
