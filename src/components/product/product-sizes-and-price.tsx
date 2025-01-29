"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { H3 } from "../ui/typography";
import { useQueryState } from "nuqs";

export function ProductSizesAndPrice({
  title,
  prices,
  testPrice,
}: {
  title: string;
  prices: { size: string; price: number }[];
  testPrice: Record<string, number>[];
}) {
  const [sizeQuery, setSizeQuery] = useQueryState("size", {
    defaultValue: prices[0]?.size ?? "",
  });

  return (
    <div>
      <div>
        <H3 className="mb-2">{title}</H3>
        <div className="flex space-x-4">
          {testPrice.map((obj, i) => (
            <Button
              key={i}
              onClick={async () => {
                await setSizeQuery(Object.keys(obj)[0] ?? "");
              }}
              className="flex w-min min-w-20 items-center space-x-2 capitalize"
              variant={
                Object.keys(obj)[0] === sizeQuery ? "outline" : "secondary"
              }
            >
              {Object.keys(obj)[0]}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold">
        {testPrice.map((obj) => obj[sizeQuery] && formatPrice(obj[sizeQuery]))}
      </div>
    </div>
  );
}
