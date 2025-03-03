import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { PagePagination } from "@/components/page-pagination";
import { ProductCard } from "@/components/product";
import { validateLang } from "@/lib/utils";
import type { ProductSort } from "@/server/modules/product/product.types";
import { api } from "@/trpc/server";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

const PRODUCTS_PER_PAGE = 12;

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ locale: string; sort: ProductSort }>;
}) {
  const { page } = await searchParams;

  const { locale, sort } = await params;

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

  setRequestLocale(lang);

  const { products, productsCount } = await api.public.products.getAll({
    take: PRODUCTS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    orderBy: sort,
  });

  return (
    <div className="w-full space-y-10 py-4 md:py-20">
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 px-2.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
