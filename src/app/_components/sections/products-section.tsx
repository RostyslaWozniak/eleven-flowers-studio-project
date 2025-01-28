import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product";
import { H1, H2 } from "@/components/ui/typography";
import { type Product } from "@/types";
import { useTranslations } from "next-intl";

export function ProductsSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const t = useTranslations("ProductPage");
  return (
    <section>
      <MaxWidthWrapper className="my-12 space-y-8 lg:my-24 lg:space-y-14">
        <H1 className="capitalize md:text-center">{title}</H1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <H2 className="text-foreground/70">{t("noProductsFound")}</H2>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
