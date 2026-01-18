import { useTranslations } from "next-intl";
import type { ProductDTO } from "../../types/product.types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsRow } from "@/components/product/products-row";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/section-heading";

export function RelatedProductsSection({
  relatedProducts,
}: {
  relatedProducts: ProductDTO[];
}) {
  const t = useTranslations("product");
  return (
    <SectionWrapper>
      <MaxWidthWrapper>
        <SectionHeading
          title={t("related_products")}
          showMoreHref="/products/new"
        />
        <ProductsRow products={relatedProducts} />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
