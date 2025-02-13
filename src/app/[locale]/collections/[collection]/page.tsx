import { db } from "@/server/db";
import { ProductsGrid } from "@/components/products-grid";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import { redirect } from "@/i18n/routing";
import Pagination from "@/components/pagination";

const PRODUCTS_PER_PAGE = 12;

export const revalidate = 86400; // Refresh cached pages once every 24 hours

export async function generateStaticParams() {
  const collections = await db.collection.findMany({
    select: {
      slug: true,
    },
  });

  return collections.map(({ slug }) => ({
    collection: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;

  const collectionData = await api.public.collections.getUniqCollectionBySlug({
    slug: collection,
  });
  return {
    title:
      collectionData.name.slice(0, 1).toLocaleUpperCase() +
      collectionData.name.slice(1).toLocaleLowerCase(),
    description:
      collectionData.description ??
      `This is collection - ${collectionData.name}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page } = await searchParams;
  const { collection, locale } = await params;

  const collections = await api.public.collections.getAllCollections({});

  const collectionData = collections.find((item) => item.slug === collection);

  if (!collectionData) {
    return redirect({ locale, href: "/404" });
  }

  const { products, productsCount } =
    await api.public.products.getProductsByCollectionSlug({
      collectionSlug: collection,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    });

  return (
    <>
      <ProductsGrid products={products} title={collectionData.name} />
      <div className="mx-auto flex max-w-[1400px] justify-center pb-8 md:justify-end">
        <Pagination totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)} />
      </div>
      <CollectionsSection currCollectionSlug={collection} />
      <ContactSection />
    </>
  );
}
