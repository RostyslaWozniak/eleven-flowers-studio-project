import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export function MostPopularProductsSection() {
  const t = useTranslations("home.popular_products");
  return (
    <section className="pace-y-8 w-full pt-12 lg:space-y-8 lg:pt-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 px-0 lg:gap-y-12">
        <H2>{t("title")}</H2>
        <Suspense
          fallback={
            <div className="flex w-full gap-8 px-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} className="aspect-[5/6]" />
              ))}
            </div>
          }
        >
          <ProductsPreview orderBy="new" />
        </Suspense>
        <Link
          href="/products?sort=popular"
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
