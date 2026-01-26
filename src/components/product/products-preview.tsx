import type { ProductSort } from "@/server/modules/product/product.types";
import { api } from "@/trpc/server";
import { ProductsView } from "@/features/products/components/products-view";

export async function ProductsPreview({ orderBy }: { orderBy: ProductSort }) {
  const { products } = await api.public.products.getAll({
    orderBy,
    take: 4,
  });

  return <ProductsView products={products} />;
}
