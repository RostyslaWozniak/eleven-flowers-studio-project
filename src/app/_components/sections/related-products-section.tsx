import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsRow } from "@/components/product/products-row";
import { H2 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";

export async function RelatedProductsSection({
  productId,
  collectionSlug,
}: {
  productId: string;
  collectionSlug: string | null;
}) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "product" });

  const relatedProducts = await api.public.products.getRelatedProducts({
    productId,
    collectionSlug,
  });

  return (
    <MaxWidthWrapper className="px-0">
      <div className="space-y-4 px-2.5">
        <H2 className="border-b pb-2 text-start md:text-start">
          {t("related_products")}
        </H2>

        <ProductsRow products={relatedProducts} />
      </div>
    </MaxWidthWrapper>
  );
}
