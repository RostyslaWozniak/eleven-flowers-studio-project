import { Link } from "@/i18n/routing";
import { ProductCard } from "./product-card";
import { useTranslations } from "next-intl";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ProductDTO } from "@/types";
import { type H1, H2, type H3 } from "@/components/ui/typography";

export function ProductsPreview({
  title,
  products,
  href,
  heading: Heading = H2,
  separator = false,
}: {
  title: string;
  products: ProductDTO[];
  href: string;
  heading?: typeof H1 | typeof H2 | typeof H3;
  separator?: boolean;
}) {
  const t = useTranslations("home.popular_products");

  return (
    <section className="pace-y-8 w-full pt-12 lg:space-y-8 lg:pt-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 px-0 lg:gap-y-12">
        <Heading>{title}</Heading>
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <div key={product.id} className="min-h-full">
              <ProductCard
                product={product}
                className="min-w-[300px]"
                textMobileLarge
              />
            </div>
          ))}
        </div>

        <Link
          href={href}
          className={buttonVariants({ size: "lg", variant: "link" })}
        >
          {t("see_more")} <ArrowRight className="min-h-6 min-w-6" />
        </Link>
      </MaxWidthWrapper>
      {/* SEPARATOR */}
      {separator && (
        <div className="mx-auto max-w-[1400px] px-2.5 pt-4 lg:px-0 lg:pt-0">
          <Separator />
        </div>
      )}
    </section>
  );
}
