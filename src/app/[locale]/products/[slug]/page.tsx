import { db } from "@/server/db";
import { ProductSection } from "@/app/_components/sections/product-section";
import { CollectionsSection } from "@/app/_components/sections/collections-section";
import { ContactSection } from "@/app/_components/sections";
import type { CollectionDTO, ProductDTO } from "@/types";
import { api } from "@/trpc/server";
import { RelatedProductsSection } from "@/app/_components/sections/related-products-section";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";

export const revalidate = 86400; // Refresh cached pages once every 24 hours

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
    title: productTitle ?? "Eleven Flowers Studio",
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
  const { slug } = await params;

  const product: ProductDTO | null = await api.public.products.getProductBySlug(
    {
      slug,
    },
  );
  if (!product) {
    return <NotFoundSection />;
  }

  const collections: CollectionDTO[] =
    await api.public.collections.getAllCollections({});

  return (
    <div>
      <ProductSection product={product} />

      <div className="mt-8">
        <RelatedProductsSection
          productId={product.id}
          collectionSlug={product.collection?.slug ?? null}
        />
      </div>
      <div className="mt-12">
        <CollectionsSection collections={collections} />
      </div>
      <ContactSection />
    </div>
  );
}
