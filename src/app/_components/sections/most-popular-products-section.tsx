import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { SectionWrapper } from "@/components/section-wrapper";
// import { buttonVariants } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
// import { Link } from "@/i18n/routing";
import { api } from "@/trpc/server";
// import { ArrowRight } from "lucide-react";

import { getTranslations } from "next-intl/server";

export async function MostPopularProductsSection() {
  const t = await getTranslations({
    namespace: "home.popular_products",
  });

  const { products } = await api.public.products.getAll({
    take: 4,
    skip: 0,
    orderBy: "popular",
  });

  return (
    <SectionWrapper>
      <MaxWidthWrapper className="mb-6 flex flex-col items-center gap-6 lg:gap-y-12">
        {/* <H2>{t("title")}</H2> */}
        <div className="w-full">
          <SectionHeading
            heading={H2}
            title={t("title")}
            showMoreHref="/products/popular"
          />
        </div>
        <ScrollWrapper className="w-screen xl:w-full">
          {products.map((product) => (
            <div key={product.id} className="min-h-full">
              <ProductCard
                product={product}
                className="min-w-[300px]"
                textMobileLarge
              />
            </div>
          ))}
        </ScrollWrapper>
        {/* <Link
          href="/products/popular"
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          {t("see_more")} <ArrowRight className="min-h-6 min-w-6" />
        </Link> */}
      </MaxWidthWrapper>
      {/* SEPARATOR */}
      {/* <div className="mx-auto max-w-[1400px] px-2.5 lg:px-0">
        <Separator />
      </div> */}
    </SectionWrapper>
  );
}
