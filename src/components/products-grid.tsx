import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product";
import { H1, H2 } from "@/components/ui/typography";
import { type ProductDTO } from "@/types";
import { useTranslations } from "next-intl";

export function ProductsGrid({
  title,
  products,
}: {
  title: string;
  products: ProductDTO[];
}) {
  const t = useTranslations("product");
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="space-y-8 py-12 lg:space-y-14 lg:py-16">
        <H1 className="capitalize md:text-center">{title}</H1>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <H2 className="text-foreground/70">{t("no_products")}</H2>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
