import { ProductCard } from "./product-card";
import { api } from "@/trpc/server";

export async function ProductsPreview({
  orderBy,
}: {
  orderBy: "new" | "popular" | "price-desc" | "price-asc";
}) {
  const { products } = await api.public.products.getAllProducts({
    take: 4,
    orderBy,
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
