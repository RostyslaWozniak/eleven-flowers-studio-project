import { ProductsGrid } from "@/components/products-grid";
import { ContactSection } from "@/app/_components/sections";
import { api } from "@/trpc/server";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { getTranslations } from "next-intl/server";
import { capitalizeString, validateLang } from "@/lib/utils";
import { PagePagination } from "@/components/page-pagination";
import { CollectionLinksSection } from "@/features/collections/components/sections/collection-links.section";
import { getCollections } from "@/features/collections/cache/get-collections";

const PRODUCTS_PER_PAGE = 12;

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: collectionSlug } = await params;

  const t = await getTranslations({
    namespace: "collection_page",
  });
  const notFoundTranslation = await getTranslations({
    namespace: "not_found",
  });
  try {
    const collection = await api.public.collections.getBySlug({
      slug: collectionSlug,
    });

    const capitalizedCollectionName = capitalizeString(collection.name);
    return {
      title: `${capitalizedCollectionName} - ${t("metadata.title")}`,
      description:
        collection.description ??
        `${t("metadata.title")} - ${t("metadata.description")}`,
      openGraph: {
        images: collection.imageUrl,
      },
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
  params: Promise<{ collection: string; page: string; locale: string }>;
}) {
  const { collection: collectionSlug, page, locale } = await params;
  const lang = validateLang(locale);

  const collections = await getCollections({ locale: lang });

  const collection = collections.find((item) => item.slug === collectionSlug);

  if (!collection) {
    return <NotFoundSection />;
  }

  const t = await getTranslations("collection_page");

  const { products, productsCount } =
    await api.public.products.getManyByColectionSlug({
      collectionSlug: collectionSlug,
      take: PRODUCTS_PER_PAGE,
      skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
    });

  if (!products.length) {
    return <NotFoundSection />;
  }

  return (
    <>
      {productsCount > PRODUCTS_PER_PAGE * (parseInt(page) - 1) && (
        <ProductsGrid
          products={products}
          title={collection?.name ?? t("title")}
        />
      )}

      {productsCount / PRODUCTS_PER_PAGE > 1 && (
        <div className="mx-auto flex max-w-[1400px] justify-center pb-8 md:justify-end">
          <PagePagination
            totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)}
          />
        </div>
      )}
      <CollectionLinksSection currCollectionSlug={collectionSlug} />
      <ContactSection />
    </>
  );
}
