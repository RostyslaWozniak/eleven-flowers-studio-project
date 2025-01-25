import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileCarousel } from "@/components/mobile-carousel";
import { MobileSwiper } from "@/components/mobile-swiper";
import { ProductCard } from "@/components/product";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { H2 } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Bukiet",
    price: 125,
    image: "/products/bouquet.jpg",
    tag: "bukiety",
    href: "/collections/bouquets/1",
  },
  {
    id: 2,
    name: "Flower Box",
    price: 179,
    image: "/products/flower-box.png",
    tag: "flower-box",
    href: "/collections/flower-box/2",
  },
  {
    id: 3,
    name: "Balony",
    price: 89,
    image: "/products/balloons.png",
    tag: "balony",
    href: "/collections/balloons/3",
  },
  {
    id: 4,
    name: "Prezent",
    price: 110,
    image: "/products/gift.png",
    tag: "prezenty",
    href: "/collections/gifts/4",
  },
];

export type Product = (typeof products)[number];

export function MostPopularProductsSection() {
  return (
    <section>
      <MaxWidthWrapper
        border
        className="flex flex-col items-center gap-y-8 overflow-x-hidden pt-12 lg:gap-y-16"
      >
        <H2>Najbardziej popularne</H2>
        <div className="hidden w-full items-center justify-between gap-4 lg:flex">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-4 scroll-smooth lg:hidden">
          <MobileCarousel>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[88%] sm:basis-1/2 md:basis-1/3"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </MobileCarousel>
        </div>
        <div className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-5 overflow-x-scroll px-2.5 py-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[300px] snap-center"
            />
          ))}
        </div>

        <MobileSwiper products={products} />

        <Button variant="outline">
          Zobacz więcej <ArrowRight className="min-h-6 min-w-6" />
        </Button>
      </MaxWidthWrapper>
    </section>
  );
}
