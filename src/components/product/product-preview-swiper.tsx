"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { type Product } from "@/app/_components/sections";
import { ProductCard } from "./product-card";

export function ProductPreviewSwiper({ products }: { products: Product[] }) {
  return (
    <Swiper
      slidesPerView={1.3}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="pb-12">
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
