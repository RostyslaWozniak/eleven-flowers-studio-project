import { ContactSection } from "@/app/_components/sections";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { capitalizeString, validateLang } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { api } from "@/trpc/server";
import { CollectionLinksSection } from "@/features/collections/components/sections/collection-links.section";
import { RelatedProductsSection } from "@/features/products/components/sections/related-products.section";
import { ProductHero } from "@/features/products/components/product-hero";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; product: string; locale: string }>;
}) {
  const { product: productSlug, locale } = await params;

  const lang = validateLang(locale);

  const [product, notFoundTranslation, t] = await Promise.all([
    api.public.products.getBySlug({ slug: productSlug }),
    getTranslations("not_found"),
    getTranslations({
      locale: lang,
      namespace: "collection_page",
    }),
  ]);

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
  params: Promise<{ product: string }>;
}) {
  const { product: productSlug } = await params;

  const product = await api.public.products.getBySlug({ slug: productSlug });

  if (!product) {
    return <NotFoundSection />;
  }

  const relatedProducts = await api.public.products.getRelated({
    productId: product.id,
    collectionSlug: product.collection?.slug ?? null,
  });

  return (
    <>
      <ProductHero product={product} />
      {relatedProducts.length > 0 && (
        <RelatedProductsSection relatedProducts={relatedProducts} />
      )}
      <CollectionLinksSection />
      <ContactSection />
    </>
  );
}
