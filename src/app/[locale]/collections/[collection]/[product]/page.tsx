import { db } from "@/server/db";
import { ProductSection } from "@/app/_components/sections/product-section";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import type { ProductDTO } from "@/types";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { cache } from "react";

import { mapProductToDTO } from "@/lib/utils/dto";
import { capitalizeString, validateLang } from "@/lib/utils";
import { H2 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";
import { ProductsRow } from "@/components/product/products-row";
import { getRelatedProducts } from "@/server/api/routers/lib/products";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

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

  const lang = validateLang(locale);

  const product = await getProductBySlug(productSlug, lang);

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });
  const notFoundTranslation = await getTranslations({
    locale: lang,
    namespace: "not_found",
  });

  if (!product) {
    return {
      title: "404 " + notFoundTranslation("product_not_found"),
      description: notFoundTranslation("product_not_found"),
    };
  }

  return {
    title: `${capitalizeString(product.name)} - ${t("metadata.title")}`,
    description: `${product.name} -${t("metadata.title")} - ${t("metadata.description")}`,
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
  const paramsData = await params;

  const { product: slug, locale } = paramsData;

  const lang = validateLang(locale);

  const product: ProductDTO | null = await getProductBySlug(slug, lang);
  if (!product) {
    return <NotFoundSection />;
  }

  const relatedProducts = await getRelatedProducts({
    productId: product.id,
    collectionSlug: product.collection?.slug,
    locale: lang,
    take: 4,
  });

  const t = await getTranslations({ locale: lang, namespace: "product" });

  return (
    <div>
      <ProductSection product={product} locale={lang} />

      <section>
        <MaxWidthWrapper>
          <div className="space-y-4 pt-8">
            <H2 className="border-b pb-2 text-start md:text-start">
              {t("related_products")}
            </H2>

            <ProductsRow products={relatedProducts} locale={lang} />
          </div>
        </MaxWidthWrapper>
      </section>
      <CollectionsSection
        currCollectionSlug={product.collection?.slug}
        locale={lang}
      />
      <ContactSection locale={lang} />
    </div>
  );
}
