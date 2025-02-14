import { db } from "@/server/db";
import { ProductsGrid } from "@/components/products-grid";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import Pagination from "@/components/pagination";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { getTranslations } from "next-intl/server";

const PRODUCTS_PER_PAGE = 60;

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
  params: Promise<{ collection: string; locale: string }>;
}) {
  const { collection: collectionSlug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "not_found" });
  try {
    const collection = await api.public.collections.getUniqCollectionBySlug({
      slug: collectionSlug,
    });
    return {
      title:
        collection.name.slice(0, 1).toLocaleUpperCase() +
        collection.name.slice(1).toLocaleLowerCase(),
      description:
        collection.description ?? `This is collection - ${collection.name}`,
    };
  } catch {
    return {
      title: "404 " + t("collection_not_found"),
      description: t("collection_not_found"),
    };
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page } = await searchParams;
  const { collection: collectionSlug } = await params;

  const collections = await api.public.collections.getAllCollections({});

  const collection = collections.find((item) => item.slug === collectionSlug);

  if (!collection) {
    return <NotFoundSection />;
  }

  const { products, productsCount } =
    await api.public.products.getProductsByCollectionSlug({
      collectionSlug: collectionSlug,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    });

  return (
    <>
      <ProductsGrid products={products} title={collection.name} />
      <div className="mx-auto flex max-w-[1400px] justify-center pb-8 md:justify-end">
        <Pagination totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)} />
      </div>
      <CollectionsSection currCollectionSlug={collectionSlug} />
      <ContactSection />
    </>
  );
}
