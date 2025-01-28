"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { ProductCard } from "./product-card";
import { type Product } from "@/types";

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
      className="overflow-visible"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="pb-12">
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
