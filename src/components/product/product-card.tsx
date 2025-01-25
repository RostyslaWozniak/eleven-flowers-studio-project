"use client";

import Image from "next/image";
import { H3, Text } from "@/components/ui/typography";
import { type Product } from "@/app/_components/sections/most-popular-products-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type MouseEvent } from "react";
import { Badge } from "../ui/badge";

export function ProductCard({ product }: { product: Product }) {
  function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.stopPropagation();
    console.log("dodano do koszyka");
  }
  return (
    <div className="max-w-[340px] space-y-3 text-center">
      <div className="group relative space-y-4">
        <Link href={`/collections/${product.tag}`}>
          <Badge className="absolute left-2 top-3 z-20">{product.tag}</Badge>
        </Link>
        <Link href={product.href}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              className="object-cover duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90"
              fill
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="mt-2 space-y-2">
            <H3 className="font-normal group-hover:underline">
              {product.name}
            </H3>
            <Text size="subtitle" className="text-2xl font-bold text-primary">
              {product.price} zł
            </Text>
          </div>
        </Link>
      </div>
      <div>
        <div className="px-4">
          <Button onClick={handleClick}>Dodaj do koszyka</Button>
        </div>
      </div>
    </div>
  );
}
