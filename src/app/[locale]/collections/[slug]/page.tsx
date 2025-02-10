import { db } from "@/server/db";
import { getLocale } from "next-intl/server";
import { ProductsGrid } from "@/components/products-grid";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import type { ProductDTO } from "@/types";
import { redirect } from "@/i18n/routing";

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
  const locale = await getLocale();
  const { slug } = await params;

  const collection = await api.public.collections.getUniqCollectionBySlug({
    slug,
    locale,
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
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const collections = await api.public.collections.getAllCollections({
    locale,
  });

  const collection = collections.find((collection) => collection.slug === slug);

  if (!collection) {
    return redirect({ locale, href: "/404" });
  }

  const products: ProductDTO[] =
    await api.public.products.getProductsByCollectionSlug({
      collectionSlug: slug,
      locale,
    });

  return (
    <>
      <ProductsGrid products={products} title={collection.name} />
      <CollectionsSection currCollectionSlug={slug} collections={collections} />
      <ContactSection />
    </>
  );
}
