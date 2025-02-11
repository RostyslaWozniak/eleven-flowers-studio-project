import { db } from "@/server/db";
import { ProductsGrid } from "@/components/products-grid";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import { redirect } from "@/i18n/routing";
import Pagination from "@/components/pagination";

const PRODUCTS_PER_PAGE = 12;

export async function generateStaticParams() {
  const collections = await db.collection.findMany({
    select: {
      slug: true,
    },
  });

  return collections.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = await api.public.collections.getUniqCollectionBySlug({
    slug,
  });
  return {
    title:
      collection.name.slice(0, 1).toLocaleUpperCase() +
      collection.name.slice(1).toLocaleLowerCase(),
    description:
      collection.description ?? `This is collection - ${collection.name}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page } = await searchParams;
  const { slug, locale } = await params;

  const collections = await api.public.collections.getAllCollections({});

  const collection = collections.find((collection) => collection.slug === slug);

  if (!collection) {
    return redirect({ locale, href: "/404" });
  }

  const { products, productsCount } =
    await api.public.products.getProductsByCollectionSlug({
      collectionSlug: slug,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    });

  return (
    <>
      <ProductsGrid products={products} title={collection.name} />
      <div className="mx-auto flex max-w-[1400px] justify-center pb-8 md:justify-end">
        <Pagination totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)} />
      </div>
      <CollectionsSection currCollectionSlug={slug} collections={collections} />
      <ContactSection />
    </>
  );
}
