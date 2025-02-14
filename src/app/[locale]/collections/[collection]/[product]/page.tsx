import { db } from "@/server/db";
import { ProductSection } from "@/app/_components/sections/product-section";
import { CollectionsSection } from "@/app/_components/sections/collections-section";
import { ContactSection } from "@/app/_components/sections";
import type { ProductDTO } from "@/types";
import { api } from "@/trpc/server";
import { RelatedProductsSection } from "@/app/_components/sections/related-products-section";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { cache, Suspense } from "react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";

import { mapProductToDTO } from "@/lib/utils/dto";

const getProductsSlugWithCollections = cache(async () => {
  const products = await db.product
    .findMany({
      select: {
        slug: true,
        collection: {
          select: {
            slug: true,
          },
        },
      },
    })
    .then((res) =>
      res.map(({ slug, collection }) => ({
        product: slug,
        collection: collection?.slug,
      })),
    );

  return products;
});

const getProductBySlug = cache(async (slug: string, locale: string) => {
  const product = await db.product.findFirst({
    where: {
      slug: slug,
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

  return product ? mapProductToDTO(product) : null;
});

export async function generateStaticParams() {
  const products = await getProductsSlugWithCollections();
  return products;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; product: string; locale: string }>;
}) {
  const { product: productSlug, locale } = await params;

  const product = await getProductBySlug(productSlug, locale);

  if (!product) {
    return <NotFoundSection />;
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ product: string; locale: string }>;
}) {
  const { product: slug } = await params;

  const product: ProductDTO | null = await api.public.products.getProductBySlug(
    {
      slug,
    },
  );
  if (!product) {
    return <NotFoundSection />;
  }

  return (
    <div>
      <ProductSection product={product} />

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="flex w-full gap-8 px-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} className="aspect-[5/6]" />
              ))}
            </div>
          }
        >
          <RelatedProductsSection
            productId={product.id}
            collectionSlug={product.collection?.slug ?? null}
          />
        </Suspense>
      </div>
      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <CollectionsSection />
        </Suspense>
      </div>
      <ContactSection />
    </div>
  );
}
