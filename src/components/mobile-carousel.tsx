"use client";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useState } from "react";

export function MobileCarousel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  return (
    <div className={cn("", className)}>
      <Carousel>
        <CarouselContent className="w-screen">{children}</CarouselContent>
      </Carousel>
      {/* <div className="flex items-center justify-center gap-2 pt-8">
        {Array.from({ length: count }).map((_, i) => (
          <div
            onClick={() => api?.scrollTo(i)}
            key={i}
            className={cn("aspect-square w-3 rounded-full border", {
              "bg-primary": i + 1 === current,
            })}
          ></div>
        ))}
      </div> */}
    </div>
  );
}
