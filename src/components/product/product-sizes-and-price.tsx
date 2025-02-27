"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { H3 } from "../ui/typography";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export function ProductSizesAndPrice({
  title,
  prices,
}: {
  title: string;
  prices: { size: string; price: number }[];
}) {
  const [sizeQuery, setSizeQuery] = useQueryState("size", {
    defaultValue: prices[0]?.size ?? "",
  });

  useEffect(() => {
    if (!prices.map(({ size }) => size).includes(sizeQuery)) {
      void setSizeQuery(prices[0]?.size ?? "");
    }
  }, [prices, setSizeQuery, sizeQuery]);

  return (
    <div>
      <div>
        <H3 className="mb-2 px-2.5">{title}</H3>

        <div className="scrollbar-hide flex w-screen items-start gap-x-2 gap-y-1 overflow-x-auto px-2.5 py-1">
          {prices.map(({ size }, i) => (
            <Button
              key={i}
              onClick={async () => {
                await setSizeQuery(size);
              }}
              className="flex w-min min-w-20 items-center space-x-2 capitalize"
              variant={size === sizeQuery ? "outline" : "secondary"}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 px-2.5 text-3xl font-bold">
        {formatPrice(
          prices.find(({ size }) => size === sizeQuery)?.price ?? null,
        )}
      </div>
    </div>
  );
}
