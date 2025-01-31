import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { type ProductDTO } from "@/types";

export function MostPopularProductsSection({
  products,
}: {
  products: ProductDTO[];
}) {
  const t = useTranslations("HomePage.MostPopularProductsSection");
  return (
    <section className="pace-y-8 w-full pt-12 lg:space-y-8 lg:pt-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 px-0 lg:gap-y-12">
        <H2>{t("title")}</H2>
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 lg:grid lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="min-h-full">
              <ProductCard product={product} className="min-w-[300px]" />
            </div>
          ))}
        </div>

        <Link
          href={"/collections"}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          {t("seeMoreButton")} <ArrowRight className="min-h-6 min-w-6" />
        </Link>
      </MaxWidthWrapper>
      {/* SEPARATOR */}
      <div className="mx-auto max-w-[1400px] px-2.5 pt-4 lg:px-0 lg:pt-0">
        <Separator />
      </div>
    </section>
  );
}
