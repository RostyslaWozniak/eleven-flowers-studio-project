import { ProductsPreview } from "@/components/product/products-preview";
import { api } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";

export async function MostPopularProductsSection() {
  const locale = await getLocale();

  const { products } = await api.public.products.getAllProducts({
    take: 4,
    orderBy: "popularity",
  });

  const t = await getTranslations({
    locale,
    namespace: "home",
  });
  return (
    <ProductsPreview
      title={t("popular_products.title")}
      products={products}
      href="/products?sort=popular"
      separator
    />
  );
}
