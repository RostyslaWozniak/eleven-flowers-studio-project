import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { Link, type Locale } from "@/i18n/routing";
import { getAllProducts } from "@/server/api/routers/lib/products";
import { Prisma } from "@prisma/client";
import { ArrowRight } from "lucide-react";

import { getTranslations } from "next-intl/server";

export async function MostPopularProductsSection({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations({
    locale,
    namespace: "home.popular_products",
  });

  const products = await getAllProducts({
    locale,
    take: 4,
    skip: 0,
    orderBy: { orderItem: { _count: Prisma.SortOrder.desc } },
  });

  return (
    <section className="pace-y-8 w-full pt-12 lg:space-y-8 lg:pt-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 px-0 lg:gap-y-12">
        <H2>{t("title")}</H2>
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <div key={product.id} className="min-h-full">
              <ProductCard
                locale={locale}
                product={product}
                className="min-w-[300px]"
                textMobileLarge
              />
            </div>
          ))}
        </div>
        <Link
          locale={locale}
          href="/products/popular"
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          {t("see_more")} <ArrowRight className="min-h-6 min-w-6" />
        </Link>
      </MaxWidthWrapper>
      {/* SEPARATOR */}
      <div className="mx-auto max-w-[1400px] px-2.5 pt-4 lg:px-0 lg:pt-0">
        <Separator />
      </div>
    </section>
  );
}
