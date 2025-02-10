"use client";

import { OrderItemSkeleton } from "@/components/skeletons/order-item-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Logo2 } from "@/components/ui/logo";
import { H2, H3, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn, formatPrice } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderItemsList() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [isDataLoading, setIsDataLoading] = useState(true);
  const { data: orderItems } = api.public.order.getOrderById.useQuery();

  const t = useTranslations("payment.order_summary");

  useEffect(() => {
    if (orderItems && orderItems.length > 0) {
      setIsDataLoading(false);
      setTotalPrice(orderItems.reduce((acc, item) => acc + item.price!, 0));
    }
    if (setIsDataLoading) setTimeout(() => setIsDataLoading(false), 5000);
  }, [orderItems]);
  return (
    <div>
      <div className="lg:py-6">
        {isDataLoading ? (
          <div>
            {Array.from({ length: 3 }).map((_, i) => (
              <OrderItemSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {orderItems && orderItems.length > 0 ? (
              <div>
                <H2 className="text-start text-2xl font-light md:text-start">
                  {t("title")}
                </H2>
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center space-x-4 border-b border-gray-200 py-4 last:border-b-0"
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
                      <Link
                        href={`/products/${item.slug}?size=${item.size}`}
                        className="text-primary hover:underline"
                      >
                        <H3 className="font-semibold">{item.productName}</H3>
                      </Link>
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
              </div>
            ) : (
              <section className="">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-20 px-2.5 py-20 sm:px-6 lg:px-8">
                  <div className="flex w-full items-center justify-center text-center">
                    <div className="max-w-2xl space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <Logo2 />
                        </div>
                        <H2 className="text-4xl lg:text-6xl">Empty</H2>
                      </div>
                      <div className="mt-8 space-y-4">
                        <Link
                          href="/products"
                          className={cn(buttonVariants({ variant: "outline" }))}
                        >
                          {t("button")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
