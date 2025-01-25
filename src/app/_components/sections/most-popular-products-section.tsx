import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileSwiper } from "@/components/mobile-swiper";
import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
        className="flex flex-col items-center gap-y-8 overflow-x-hidden px-0 pt-12 lg:gap-y-16"
      >
        <H2>Najbardziej popularne</H2>
        <div className="hidden w-full items-center justify-between gap-4 lg:flex">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <MobileSwiper products={products} />

        <Link
          href={"/collections"}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          Zobacz więcej <ArrowRight className="min-h-6 min-w-6" />
        </Link>
      </MaxWidthWrapper>
    </section>
  );
}
