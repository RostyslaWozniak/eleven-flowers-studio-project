import type { ProductDTO } from "@/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import {
  ProductSizesAndPrice,
  ProductImageGallery,
  AddToCartButton,
} from "@/components/product";

export function ProductSection({ product }: { product: ProductDTO }) {
  const t = useTranslations("ProductPage");

  const images = product.images.map((image) => ({
    url: image,
    alt: product.name,
  }));

  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="grid gap-x-8 md:grid-cols-2">
        <ProductImageGallery images={images} />

        <div className="flex flex-col gap-y-6 lg:pt-28">
          <div>
            <H1 className="capitalize">{product.name}</H1>
            <Link
              href={`/collections/${product.collection?.slug}`}
              className="mt-4 inline-block"
            >
              <Badge className="" variant="outline">
                {product.collection?.name}
              </Badge>
            </Link>
          </div>
          <Text variant="muted" size="subtitle">
            {product.description}
          </Text>
          <ProductSizesAndPrice
            title={t("size")}
            prices={product.prices}
            testPrice={product.prices.map(({ size, price }) => ({
              [size]: price,
            }))}
          />

          <div className="flex justify-center sm:justify-start">
            <AddToCartButton product={product} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
