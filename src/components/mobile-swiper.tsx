"use client";

import { type Product } from "@/app/_components/sections";
import { ProductCard } from "./product";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import throttle from "lodash.throttle";

export function MobileSwiper({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = throttle(() => {
    if (ref.current) {
      const scrollLeft = ref.current.scrollLeft;
      const itemWidth = ref.current.offsetWidth;
      const index = Math.ceil(scrollLeft / (itemWidth - 80));
      console.log({
        scrollLeft,
        itemWidth,
      });
      setCurrentIndex(index);
    }
  }, 500);

  useEffect(() => {
    const scrollable = ref.current;
    scrollable?.addEventListener("scroll", handleScroll);

    return () => {
      scrollable?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="relative w-full lg:hidden">
      {/* Swiper Section */}
      <div
        ref={ref}
        className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-5 overflow-x-scroll px-2.5 py-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="min-w-[300px] snap-center"
          />
        ))}
      </div>

      {/* Dots Section */}
      <div className="mt-2 flex justify-center gap-2">
        {products.map((_, index) => (
          <div
            onClick={() => {
              ref?.current?.scrollTo({
                left: index * ((ref?.current?.offsetWidth ?? 0) - 120),
                behavior: "smooth",
              });
            }}
            key={index}
            className={cn("h-3 w-3 rounded-full border", {
              "bg-primary": index === currentIndex,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
}
