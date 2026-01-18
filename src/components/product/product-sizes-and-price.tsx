"use client";

import { cn, formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { Text } from "../ui/typography";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { ScrollWrapper } from "../scroll-wrapper";
import { useTranslations } from "next-intl";

export function ProductSizesAndPrice({
  prices,
}: {
  prices: { size: string; price: number }[];
}) {
  const t = useTranslations("product");
  const [sizeQuery, setSizeQuery] = useQueryState("size", {
    defaultValue: prices[0]?.size ?? "",
  });

  useEffect(() => {
    if (!prices.map(({ size }) => size).includes(sizeQuery)) {
      void setSizeQuery(prices[0]?.size ?? "");
    }
  }, [prices, setSizeQuery, sizeQuery]);

  return (
    <>
      <Text size={"lg"} className="mb-1" variant={"muted"}>
        {t("size")}
      </Text>

      <ScrollWrapper className="mb-4 w-screen">
        {prices.map(({ size }, i) => (
          <Button
            key={i}
            onClick={async () => {
              await setSizeQuery(size);
            }}
            className={cn(
              "flex max-h-12 w-min min-w-20 items-center space-x-2 capitalize",
              {
                "border-transparent text-muted-foreground": size !== sizeQuery,
              },
            )}
            variant="outline"
          >
            {size}
          </Button>
        ))}
      </ScrollWrapper>
      <div className="text-3xl font-bold">
        {formatPrice(
          prices.find(({ size }) => size === sizeQuery)?.price ?? null,
        )}
      </div>
    </>
  );
}
