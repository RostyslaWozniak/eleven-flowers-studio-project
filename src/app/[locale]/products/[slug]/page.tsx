import { db } from "@/server/db";
import { type Product } from "@/types";
import { notFound } from "next/navigation";
import { ProductSection } from "@/app/_components/sections/product-section";
import { CollectionsSection } from "@/app/_components/sections/collections-section";
import { ContactSection } from "@/app/_components/sections";

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      slug: true,
    },
  });

  return products.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const productData = await db.product.findUnique({
    where: {
      slug,
    },
    select: {
      images: {
        select: {
          url: true,
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
  const productTitle = `${productData?.translations[0]?.name.slice(0, 1).toUpperCase()}${productData?.translations[0]?.name.slice(1)} | Eleven Flowers Studio`;
  const imagesUrl = productData?.images.map(({ url }) => url);
  return {
    title: productTitle,
    description: productData?.translations[0]?.description,
    openGraph: {
      images: imagesUrl,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  console.log({ slug, locale });

  const product: Product | null = await db.product.findUnique({
    where: {
      slug,
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

  const collectionsData = await db.collection.findMany({
    select: {
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
        },
      },
      slug: true,
    },
  });
  const collections = collectionsData.flatMap(({ translations, slug }) =>
    translations.map(({ name }) => ({
      name,
      slug,
    })),
  );
  console.log({ product });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductSection product={product} />
      <div className="mt-8">
        <CollectionsSection collections={collections} />
      </div>
      <ContactSection />
    </div>
  );
}
