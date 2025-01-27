/* eslint-disable @next/next/no-img-element */

import { type Product } from "@/app/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { H1, H3, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";

export function ProductSection({ product }: { product: Product }) {
  return (
    <section>
      <MaxWidthWrapper className="grid gap-8 md:grid-cols-2">
        {/* Left Column - Images */}
        <div className="space-y-4 p-12">
          <img
            src={product.images[0]?.url ?? "/images/bouquet-placeholder.jpg"}
            alt={product.translations[0]?.name ?? "image"}
            className="aspect-square w-full object-cover shadow-lg"
          />
          <div className="flex w-full grid-cols-3 items-start justify-start gap-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url ?? "/images/bouquet-placeholder.svg"}
                alt={`${product.collection?.translations[0]?.name} - View ${index + 1}`}
                className="aspect-square w-[100px] object-cover"
              />
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6 pt-28">
          <div>
            <H1 className="text-3xl font-bold capitalize">
              {product.translations[0]?.name}
            </H1>
            <Link href={`/collections/${product.collection?.slug}`}>
              <Badge className="" variant="outline">
                {product.collection?.translations[0]?.name}
              </Badge>
            </Link>
          </div>
          <Text variant="muted" size="subtitle">
            {product.translations[0]?.description}
          </Text>
          <div>
            <H3 className="mb-2">Size</H3>
            <div className="flex space-x-4">
              {product.prices.map(({ size }, i) => (
                <div key={size} className="flex items-center space-x-2">
                  <Button
                    className="capitalize"
                    variant={i === 0 ? "outline" : "secondary"}
                  >
                    {size}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-3xl font-bold">
            {product.prices[0] && formatPrice(product.prices[0]?.price)}
          </div>
          <Button className="w-full">
            Add to Cart
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
