import { type ProductSort } from "@/server/api/routers/public/products";
import { ProductCard } from "./product-card";
import { api } from "@/trpc/server";

export async function ProductsPreview({ orderBy }: { orderBy: ProductSort }) {
  const { products } = await api.public.products.getAll({
    orderBy,
    take: 4,
  });

  return (
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
  );
}
