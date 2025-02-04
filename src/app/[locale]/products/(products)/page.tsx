import Pagination from "@/components/pagination";
import { ProductCard } from "@/components/product";
import { api } from "@/trpc/server";

const PRODUCTS_PER_PAGE = 6;

const mapSortQueryToPrisma = (
  sortQuery: "new" | "popular" | "price-desc" | "price-asc",
) => {
  const sortMapping = {
    new: { createdAt: "desc" },
    popular: { popularity: "desc" },
    "price-desc": { price: "desc" },
    "price-asc": { price: "asc" },
  };

  return sortMapping[sortQuery] ?? { createdAt: "desc" };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;

  const { sort, page } = await searchParams;

  const { products, productsCount } = await api.public.products.getAllProducts({
    locale: locale,
    take: PRODUCTS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    orderBy: sort
      ? Object.keys(
          mapSortQueryToPrisma(
            sort as "new" | "popular" | "price-desc" | "price-asc",
          ),
        )[0]
      : "createdAt",
    order: sort
      ? (Object.values(
          mapSortQueryToPrisma(
            sort as "new" | "popular" | "price-desc" | "price-asc",
          ),
        )[0] as "asc" | "desc")
      : "asc",
  });

  return (
    <div className="w-full space-y-10 py-4 md:py-20">
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 px-2.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center md:justify-end">
        <Pagination totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)} />
      </div>
    </div>
  );
}
