import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileSwiper } from "@/components/mobile-swiper";
import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <section className="pace-y-8 w-full pt-12 lg:space-y-8 lg:pt-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 px-0 lg:gap-y-12">
        <H2 className="">Najbardziej popularne</H2>
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
      {/* SEPARATOR */}
      <div className="mx-auto max-w-[1400px] px-2.5 pt-4 lg:px-0 lg:pt-0">
        <Separator />
      </div>
    </section>
  );
}
