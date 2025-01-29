import { type Product } from "@/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { H1, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { ProductSizesAndPrice } from "@/components/product/product-sizes-and-price";
import { ProductImageGallery } from "@/components/product/product-image-gallery";

export function ProductSection({ product }: { product: Product }) {
  const t = useTranslations("ProductPage");

  const images = product.images.map((image) => ({
    url: image.url,
    alt:
      product.translations[0]?.name ??
      product.translations[0]?.description ??
      "",
  }));
  console.log({ product });
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="grid gap-x-8 md:grid-cols-2">
        <ProductImageGallery images={images} />

        <div className="flex flex-col gap-y-6 lg:pt-28">
          <div>
            <H1 className="capitalize">{product.translations[0]?.name}</H1>
            <Link
              href={`/collections/${product.collection?.slug}`}
              className="mt-4 inline-block"
            >
              <Badge className="" variant="outline">
                {product.collection?.translations[0]?.name}
              </Badge>
            </Link>
          </div>
          <Text variant="muted" size="subtitle">
            {product.translations[0]?.description}
          </Text>
          <ProductSizesAndPrice
            title={t("size")}
            prices={product.prices}
            testPrice={product.prices.map(({ size, price }) => ({
              [size]: price,
            }))}
          />

          <div className="flex justify-center sm:justify-start">
            <Button className="">{t("addToCart")}</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
