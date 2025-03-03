"use client";

import { CartItemSkeleton } from "@/components/skeletons/cart-item-skeleton";
import { H2, H3, Text } from "@/components/ui/typography";
import { useCart } from "@/context/cart-context";
import { cn, formatPrice } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CartSummary() {
  const { cartItems, totalPrice, serverCartItemsLoading } = useCart();
  const t = useTranslations("cart.cart_page.summary");

  api.public.order.removeOrderIfStatusPending.useQuery();
  return (
    <div className="lg:py-6">
      <H2 className="text-start text-2xl font-light md:text-start">
        {t("title")}
      </H2>
      {!serverCartItemsLoading ? (
        <>
          {cartItems.map((item, i) => (
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
                <H3 className="font-semibold">{item.productName}</H3>
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
          ))}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg"> {t("total")}</span>
              <span className="text-2xl font-medium">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </>
      ) : (
        Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
      )}
    </div>
  );
}
