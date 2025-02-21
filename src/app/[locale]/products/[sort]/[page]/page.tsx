import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { PagePagination } from "@/components/page-pagination";

import { ProductCard } from "@/components/product";
import { validateLang } from "@/lib/utils";
import { api } from "@/trpc/server";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

const PRODUCTS_PER_PAGE = 6;

type SortQuery = "new" | "popular" | "price-desc" | "price-asc";

const mapSortQueryToPrisma = (sortQuery: SortQuery) => {
  const sortMapping = {
    new: { createdAt: "desc" },
    popular: { popularity: "desc" },
    "price-desc": { price: "desc" },
    "price-asc": { price: "asc" },
  };

  return sortMapping[sortQuery] ?? { createdAt: "desc" };
};

async function getAllProducts(sort: SortQuery, page: string) {
  const { products, productsCount } = await api.public.products.getAllProducts({
    take: PRODUCTS_PER_PAGE,
    skip: (Number(page) - 1) * PRODUCTS_PER_PAGE,
    orderBy: sort ? Object.keys(mapSortQueryToPrisma(sort))[0] : "createdAt",
    order: sort
      ? (Object.values(mapSortQueryToPrisma(sort))[0] as "asc" | "desc")
      : "asc",
  });

  return { products, productsCount };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; sort: SortQuery; page: string }>;
}) {
  const { locale, sort, page } = await params;
  if (
    !(
      sort == "new" ||
      sort === "popular" ||
      sort === "price-desc" ||
      sort === "price-asc"
    )
  )
    return <NotFoundSection />;

  const lang = validateLang(locale);

  const { products, productsCount } = await getAllProducts(sort, page);

  return (
    <div className="w-full space-y-10 py-4 md:py-20">
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 px-2.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={lang} />
        ))}
      </div>
      {productsCount / PRODUCTS_PER_PAGE > 1 && (
        <div className="flex justify-center md:justify-end">
          <PagePagination
            totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
          />
        </div>
      )}
    </div>
  );
}
