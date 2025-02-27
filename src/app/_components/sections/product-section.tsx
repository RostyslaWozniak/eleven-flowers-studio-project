import type { ProductDTO } from "@/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import {
  ProductSizesAndPrice,
  ProductImageGallery,
  AddToCartButton,
} from "@/components/product";
import Markdown from "react-markdown";
import { getTranslations } from "next-intl/server";
import { capitalizeString } from "@/lib/utils";

export async function ProductSection({ product }: { product: ProductDTO }) {
  const t = await getTranslations("product");

  const images = product.images.map((image) => ({
    url: image,
    alt: product.name,
  }));

  const buttonInCart = t("in_cart");
  const buttonAddToCart = t("add_to_cart");

  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="grid gap-x-12 px-0 md:grid-cols-2">
        <ProductImageGallery images={images} />

        <div className="flex flex-col gap-y-6 lg:pt-28">
          <div className="px-2.5">
            <H1>{capitalizeString(product.name)}</H1>
            <Link
              href={`/collections/${product.collection?.slug}`}
              className="mt-4 inline-block"
            >
              <Badge className="" variant="outline">
                {product.collection?.name}
              </Badge>
            </Link>
          </div>

          <Markdown className="prose-p: px-2.5 prose-p:text-lg">
            {product.description}
          </Markdown>

          <ProductSizesAndPrice title={t("size")} prices={product.prices} />

          <div className="flex justify-center sm:justify-start">
            <AddToCartButton
              product={product}
              buttonInCart={buttonInCart}
              buttonAddToCart={buttonAddToCart}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
