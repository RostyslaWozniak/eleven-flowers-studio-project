import { type ProductDTO } from "@/types";
import { ProductCard } from "./product-card";
import { H3 } from "../ui/typography";
import { useTranslations } from "next-intl";

export function ProductsRow({ products }: { products: ProductDTO[] }) {
  const t = useTranslations("product");
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center">
          <H3 className="text-foreground/70">{t("no_products")}</H3>
        </div>
      )}
    </div>
  );
}
