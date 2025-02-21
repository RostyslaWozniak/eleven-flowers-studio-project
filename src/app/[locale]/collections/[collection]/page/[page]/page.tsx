import { db } from "@/server/db";
import { ProductsGrid } from "@/components/products-grid";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { getTranslations } from "next-intl/server";
import { capitalizeString, validateLang } from "@/lib/utils";
import { getAllCollections } from "@/server/api/routers/lib/collections";
import { PagePagination } from "@/components/page-pagination";

const PRODUCTS_PER_PAGE = 12;

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

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
  const lang = validateLang(locale);

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });
  const notFoundTranslation = await getTranslations({
    locale: lang,
    namespace: "not_found",
  });
  try {
    const collection = await api.public.collections.getUniqCollectionBySlug({
      slug: collectionSlug,
    });

    const capitalizedCollectionName = capitalizeString(collection.name);
    return {
      title: `${capitalizedCollectionName} - ${t("metadata.title")}`,
      description:
        collection.description ??
        `${t("metadata.title")} - ${t("metadata.description")}`,
    };
  } catch {
    return {
      title: "404 " + notFoundTranslation("collection_not_found"),
      description: notFoundTranslation("collection_not_found"),
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string; locale: string; page: string }>;
}) {
  const { collection: collectionSlug, locale, page } = await params;

  const lang = validateLang(locale);

  const collections = await getAllCollections({ locale: lang });

  const collection = collections.find((item) => item.slug === collectionSlug);

  if (!collection) {
    return <NotFoundSection />;
  }

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });

  const { products, productsCount } =
    await api.public.products.getProductsByCollectionSlug({
      collectionSlug: collectionSlug,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    });

  return (
    <>
      {productsCount > PRODUCTS_PER_PAGE * (parseInt(page) - 1) && (
        <ProductsGrid
          products={products}
          title={collection?.name ?? t("title")}
          locale={lang}
        />
      )}

      {productsCount / PRODUCTS_PER_PAGE > 1 && (
        <div className="mx-auto flex max-w-[1400px] justify-center pb-8 md:justify-end">
          <PagePagination
            totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
          />
        </div>
      )}
      <CollectionsSection currCollectionSlug={collectionSlug} locale={lang} />
      <ContactSection locale={lang} />
    </>
  );
}
