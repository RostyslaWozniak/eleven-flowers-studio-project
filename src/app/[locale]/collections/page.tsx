import { ContactSection } from "@/app/_components/sections";
import { CollectionsPreview } from "@/components/collections-preview";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H1, H2 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export default function Page() {
  const t = useTranslations("product");
  return (
    <div className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="px-0">
        <H1 className="py-12 text-center">{t("collections")}</H1>
        <CollectionsPreview />
        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
          <Separator />
        </div>
        <div>
          <H2>{t("our_newest_products")}</H2>
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
        </div>
      </MaxWidthWrapper>
      <ContactSection />
    </div>
  );
}
