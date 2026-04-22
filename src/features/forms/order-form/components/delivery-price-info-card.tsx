import { formatPrice } from "@/lib/utils";
import {
  DELIVERY_PRICES,
  MIN_FREE_DELIVERY_PRICE_IN_CENTS,
} from "@/lib/utils/delivery";
import { CheckCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function DeliveryPriceInfoCard() {
  const t = useTranslations("pages.cart_summary.order.delivery.pricing_card");

  const deliveryPricingList = t.raw("list") as {
    title: string;
    description: string;
    price: string;
  }[];
  return (
    <div className="overflow-hidden rounded-md border border-slate-300 bg-slate-100">
      <div className="p-4 px-6 pb-0">
        <div className="mb-2 border-b border-slate-300">
          <p className="mb-1">{t("title")}</p>
        </div>
        <div className="mb-3 space-y-2">
          {deliveryPricingList
            .map((el, i) => ({
              ...el,
              price: DELIVERY_PRICES[i],
            }))
            .map(({ title, description, price }) => (
              <div key={title} className="flex items-start gap-3">
                {price && (
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs">
                      {formatPrice(price)} {description}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex w-full items-start bg-primary px-4 py-2 pt-3 text-white md:px-6">
        <CheckCircleIcon className="h-5 min-h-5 w-5 min-w-5" />
        <p className="ml-2 text-sm">
          {t("free_delivery_message")}{" "}
          {formatPrice(MIN_FREE_DELIVERY_PRICE_IN_CENTS)}
        </p>
      </div>
    </div>
  );
}
