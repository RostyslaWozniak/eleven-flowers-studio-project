"use client";
import { type Product } from "@/app/_components/sections";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./product";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";

export function MobileSwiper({ products }: { products: Product[] }) {
  return (
    <Swiper
      className="flex h-full w-full"
      slidesPerView={1.2}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="">
          <ProductCard product={product} className="min-w-[300px] pb-12" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
