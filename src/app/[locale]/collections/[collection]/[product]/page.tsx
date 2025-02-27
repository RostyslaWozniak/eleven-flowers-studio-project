import { ProductSection } from "@/app/_components/sections/product-section";
import { CollectionsSection, ContactSection } from "@/app/_components/sections";
import type { ProductDTO } from "@/types";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";
import { capitalizeString, cn, validateLang } from "@/lib/utils";
import { H2 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";
import { ProductsRow } from "@/components/product/products-row";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "@/trpc/server";
import { useTranslations } from "next-intl";
import { db } from "@/server/db";
import { $Enums } from "@prisma/client";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

export async function generateStaticParams() {
  const products = await db.product
    .findMany({
      where: {
        status: $Enums.ProductStatus.AVAILABLE,
      },
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; product: string; locale: string }>;
}) {
  const { product: productSlug, locale } = await params;

  const lang = validateLang(locale);

  const notFoundTranslation = await getTranslations("not_found");
  const product = await api.public.products.getBySlug({ slug: productSlug });

  if (!product) {
    return {
      title: "404 " + notFoundTranslation("product_not_found"),
      description: notFoundTranslation("product_not_found"),
    };
  }

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });

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
  const paramsData = await params;

  const { product: productSlug } = paramsData;

  const product = await api.public.products.getBySlug({ slug: productSlug });

  if (!product) {
    return <NotFoundSection />;
  }

  const collections = await api.public.collections.getAll();

  const relatedProducts = await api.public.products.getRelated({
    productId: product.id,
    collectionSlug: product.collection?.slug ?? null,
  });

  return (
    <div>
      <ProductSection product={product} />
      <RelatedProductsSection relatedProducts={relatedProducts} />
      <CollectionsSection
        currCollectionSlug={product.collection?.slug}
        collections={collections}
      />
      <ContactSection />
    </div>
  );
}

function RelatedProductsSection({
  relatedProducts,
}: {
  relatedProducts: ProductDTO[];
}) {
  const t = useTranslations("product");
  return (
    <section>
      <MaxWidthWrapper>
        <div className="space-y-4">
          <H2 className="border-b pb-2 text-start md:text-start">
            {t("related_products")}
          </H2>

          <ProductsRow products={relatedProducts} />
        </div>
        <div className="flex items-center">
          <Link
            href="/products/new"
            className={cn(
              buttonVariants({ size: "lg", variant: "link" }),
              "mx-auto pt-4 md:pt-8",
            )}
          >
            {t("see_more")} <ArrowRight className="min-h-6 min-w-6" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
