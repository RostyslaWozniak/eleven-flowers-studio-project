import { ContactSection } from "@/app/_components/sections";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H1, H2, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { validateLang } from "@/lib/utils";
import { getAllCollections } from "@/server/api/routers/lib/collections";
import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const lang = validateLang(locale);

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = validateLang(locale);

  const t = await getTranslations({
    locale: lang,
    namespace: "collections_page",
  });

  const collections = await getAllCollections({
    locale: lang,
    take: 4,
    skip: 0,
    order: "asc",
  });
  return (
    <div className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="px-0">
        <section>
          <div className="space-y-2 py-12">
            <H1 className="text-center">{t("title")}</H1>
            <Text
              size="subtitle"
              className="mx-auto text-center"
              variant="muted"
            >
              {t("subtitle")}
            </Text>
          </div>
          <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
            {collections.map(({ slug, name, imageUrl }, i) => (
              <Link
                locale={locale}
                href={`/collections/${slug}`}
                key={i}
                className="group relative grid aspect-square min-w-[300px] place-items-center overflow-hidden"
              >
                <Image
                  fill
                  priority
                  sizes="(min-width: 1400px) 321px, 296px"
                  src={imageUrl}
                  alt={name}
                  className="absolute object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />

                <H2 className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-nowrap capitalize text-background lg:text-4xl">
                  {name}
                </H2>

                <div className="absolute inset-0 z-10 backdrop-brightness-90 duration-300 ease-in-out group-hover:backdrop-brightness-75"></div>
              </Link>
            ))}
          </div>
          {/* SEPARATOR */}
          <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
            <Separator />
          </div>
        </section>
        <section className="flex flex-col items-center gap-y-6 pt-12 md:gap-y-12">
          <H2>{t("our_newest_products")}</H2>
          <ProductsPreview locale={lang} orderBy="new" />
          <Link
            href="/products/new"
            className={buttonVariants({ size: "lg", variant: "link" })}
          >
            {t("see_more")} <ArrowRight className="min-h-6 min-w-6" />
          </Link>
          {/* SEPARATOR */}
          <div className="mx-auto w-full max-w-[1400px] px-2.5">
            <Separator />
          </div>
        </section>
      </MaxWidthWrapper>
      <ContactSection locale={lang} />
    </div>
  );
}
