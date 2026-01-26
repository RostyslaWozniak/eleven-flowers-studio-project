import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { PagePagination } from "@/components/page-pagination";

import { getProducts } from "@/features/products/cache/get-products";
import { ProductCard } from "@/features/products/components/product-card";
import { PRODUCTS_PER_PAGE } from "@/lib/constants/pagination";
import { validateLang } from "@/lib/utils";
import type { ProductSort } from "@/server/modules/product/product.types";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; sort: ProductSort; page: string }>;
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

  setRequestLocale(lang);

  const { products, productsCount } = await getProducts({
    locale: lang,
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
