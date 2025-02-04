import { ProductCard } from "@/components/product";
import { api } from "@/trpc/server";

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

  const { sort } = await searchParams;

  const { products } = await api.public.products.getAllProducts({
    locale: locale,
    take: 9,
    skip: 0,
    orderBy: sort
      ? Object.keys(
          mapSortQueryToPrisma(
            sort as "new" | "popular" | "price-desc" | "price-asc",
          ),
        )[0]
      : undefined,
    order: sort
      ? (Object.values(
          mapSortQueryToPrisma(
            sort as "new" | "popular" | "price-desc" | "price-asc",
          ),
        )[0] as "asc" | "desc")
      : "asc",
  });

  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-12 px-2.5 py-4 sm:grid-cols-2 md:py-20 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
