import { type Product } from "@/types";
import { db } from "@/server/db";
import { getLocale } from "next-intl/server";
import { ProductsSection } from "@/app/_components/sections/products-section";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { notFound } from "next/navigation";

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

  const collectionData = await db.collection.findUnique({
    where: {
      slug,
    },
    select: {
      translations: {
        where: {
          language: locale,
        },
      },
    },
  });
  const collectionTitle = collectionData
    ? `${collectionData?.translations[0]?.name.slice(0, 1).toUpperCase()}${collectionData?.translations[0]?.name.slice(1)} | Eleven Flowers Studio`
    : "404 | Eleven Flowers Studio";
  return {
    title: collectionTitle,
    description: `This is collection - ${collectionTitle}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const collections = await db.collection.findMany({
    select: {
      slug: true,
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
        },
      },
    },
  });

  const collection = collections.find((collection) => collection.slug === slug);

  if (!collection) return notFound();

  const products: Product[] = await db.product.findMany({
    where: {
      collection: {
        slug: slug,
      },
    },
    select: {
      id: true,
      slug: true,
      collection: {
        select: {
          slug: true,
          translations: {
            where: {
              language: locale,
            },
            select: {
              name: true,
            },
          },
        },
      },
      images: {
        select: {
          url: true,
        },
      },
      prices: {
        select: {
          price: true,
          size: true,
        },
        orderBy: {
          price: "asc",
        },
      },
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  return (
    <>
      <ProductsSection
        products={products}
        title={
          collection?.translations[0]
            ? collection?.translations[0]?.name
            : slug.replace("-", " ")
        }
      />
      <CollectionsSection
        currCollectionSlug={slug}
        collections={collections.map(({ slug, translations }) => ({
          name: translations[0]?.name ?? "",
          slug,
        }))}
      />
      <ContactSection />
    </>
  );
}
