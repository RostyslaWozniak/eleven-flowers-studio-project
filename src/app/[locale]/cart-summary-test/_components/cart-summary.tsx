"use client";

import { CartItemSkeleton } from "@/components/skeletons/cart-item-skeleton";
import { H2, H3, Text } from "@/components/ui/typography";
import { useCart } from "@/context/cart-context";
import { capitalizeString, cn, formatPrice } from "@/lib/utils";
import {
  DELIVERY_PRICES,
  MIN_FREE_DELIVERY_PRICE_IN_CENTS,
} from "@/lib/utils/delivery";
import { CheckCircleIcon, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CartSummary() {
  const { cartItems, totalPrice, serverCartItemsLoading, deliveryPrice } =
    useCart();
  const t = useTranslations("pages.cart_summary.order");

  return (
    <div className="lg:py-6">
      <H2 className="text-start text-2xl font-light md:text-start">
        {t("title")}
      </H2>

      <>
        {!serverCartItemsLoading
          ? cartItems.map((item, i) => (
              <div
                key={item.id}
                className={cn("flex w-full items-center space-x-4 py-4", {
                  "border-b border-gray-200": cartItems.length - 1 !== i,
                })}
              >
                <div className="relative h-20 w-20 overflow-hidden bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="(max-width: 768px) 50px, (max-width: 1200px) 50px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <H3 className="font-semibold">
                    {capitalizeString(item.productName)}
                  </H3>
                  <div className="mt-3 flex justify-between">
                    <Text variant="muted">
                      {t("size")}:{" "}
                      <span className="text-base font-bold capitalize">
                        {item.size}
                      </span>
                    </Text>
                    <Text size="subtitle" variant="muted">
                      {formatPrice(item.price)} x {item.quantity}
                    </Text>
                  </div>
                </div>
              </div>
            ))
          : Array.from({ length: 1 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
        {/* DELIVERY */}
        <div>
          <div className={cn("mb-3 flex w-full items-center space-x-4 py-4")}>
            <div className="relative h-20 min-w-20 overflow-hidden bg-slate-100 text-primary">
              <Truck className="h-full w-full object-cover p-3" />
            </div>
            <div className="mt-3 flex w-full items-center justify-between">
              <H3 className="font-semibold">
                {capitalizeString(t("delivery.title"))}
              </H3>

              {deliveryPrice !== null ? (
                <Text size="subtitle" variant="muted">
                  {formatPrice(deliveryPrice)}
                </Text>
              ) : null}
            </div>
          </div>
          <DeliveryPriceInfoCard />
        </div>
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-lg"> {t("total")}</span>
            <span className="text-2xl font-medium">
              {formatPrice(totalPrice + (deliveryPrice ?? 0))}
            </span>
          </div>
        </div>
      </>
    </div>
  );
}

function DeliveryPriceInfoCard() {
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
