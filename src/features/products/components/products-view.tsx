import { H3 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import type { ProductDTO } from "@/features/products/types/product.types";
import { ProductCard } from "@/features/products/components/product-card";

export function ProductsView({ products }: { products: ProductDTO[] }) {
  const t = useTranslations("product");
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center">
          <H3 className="text-foreground/70">{t("no_products")}</H3>
        </div>
      )}
    </>
  );
}
