import type { ProductDTO } from "../types/product.types";
import { ProductImageGallery } from "./product-image-gallery";
import { H1 } from "@/components/ui/typography";
import { LinkBadge } from "@/components/link-badge";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { AddToCartButton, ProductSizesAndPrice } from "@/components/product";
import { Markdown } from "@/components/markdown-renderer";
import { SectionWrapper } from "@/components/section-wrapper";

export function ProductHero({ product }: { product: ProductDTO }) {
  const images = product.images.map((image) => ({
    url: image,
    alt: product.name,
  }));

  return (
    <SectionWrapper className="bg-gradient-to-b from-card to-transparent pt-0">
      <MaxWidthWrapper className="grid gap-y-8 md:grid-cols-2 md:items-start md:gap-x-4 lg:grid-cols-5 xl:gap-x-8">
        <div className="top-14 md:sticky lg:col-span-2">
          <ProductImageGallery images={images} />
        </div>
        <div className="top-14 space-y-4 md:sticky lg:col-span-3">
          <div>
            <H1 className="mb-2">{product.name}</H1>
            {product.collection && (
              <LinkBadge href={`/collections/${product.collection?.slug}`}>
                {product.collection.name}
              </LinkBadge>
            )}
          </div>
          <div className="mb-4">
            <ProductSizesAndPrice prices={product.prices} />
          </div>

          <div className="flex justify-start sm:justify-start">
            <AddToCartButton product={product} />
          </div>
          <div className="h-full flex-grow">
            <Markdown>{product.description}</Markdown>
          </div>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
