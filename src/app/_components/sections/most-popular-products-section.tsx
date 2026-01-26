import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { SectionHeading } from "@/components/section-heading";
import { SectionWrapper } from "@/components/section-wrapper";
import { H2 } from "@/components/ui/typography";
import { getProducts } from "@/features/products/cache/get-products";
import { ProductsView } from "@/features/products/components/products-view";
import { validateLang } from "@/lib/utils";

import { getLocale, getTranslations } from "next-intl/server";

export async function MostPopularProductsSection() {
  const locale = await getLocale().then(validateLang);
  const t = await getTranslations({
    namespace: "home.popular_products",
  });

  const { products } = await getProducts({
    locale,
    take: 4,
    skip: 0,
    orderBy: "popular",
  });

  return (
    <SectionWrapper>
      <MaxWidthWrapper className="flex flex-col items-center gap-6 lg:gap-y-12">
        <div className="w-full">
          <SectionHeading
            heading={H2}
            title={t("title")}
            showMoreHref="/products/popular"
          />
        </div>
        <ProductsView products={products} />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
