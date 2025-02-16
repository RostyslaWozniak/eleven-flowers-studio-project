import { type Locale } from "@/i18n/routing";
import { ProductCard } from "./product-card";
import {
  getAllProducts,
  getAllProductsOrderedByPrice,
} from "@/server/api/routers/lib/products";
import { Prisma } from "@prisma/client";
import { type ProductDTO } from "@/types";

const orderByMap = {
  new: { createdAt: Prisma.SortOrder.desc },
  popular: { orderItem: { _count: Prisma.SortOrder.desc } },
} as const;

export async function ProductsPreview({
  locale,
  orderBy,
}: {
  locale: Locale;
  orderBy: "new" | "popular" | "price-desc" | "price-asc";
}) {
  let products: ProductDTO[];

  if (orderBy === "price-desc" || orderBy === "price-asc") {
    products = await getAllProductsOrderedByPrice({
      locale,
      order:
        orderBy === "price-asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
      skip: 0,
      take: 4,
    });
  } else {
    products = await getAllProducts({
      locale,
      skip: 0,
      take: 4,
      orderBy: orderByMap[orderBy],
    });
  }

  return (
    <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
      {products.map((product) => (
        <div key={product.id} className="min-h-full">
          <ProductCard
            locale={locale}
            product={product}
            className="min-w-[300px]"
            textMobileLarge
          />
        </div>
      ))}
    </div>
  );
}
