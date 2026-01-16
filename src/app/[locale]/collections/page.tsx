import { ContactSection } from "@/app/_components/sections";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { validateLang } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionCardsSection } from "@/features/collections/components/sections/collection-cards.section";

export const dynamic = "force-static";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const lang = validateLang(locale);

  const collections = await api.public.collections.getAll({});

  const t = await getTranslations({
    locale: lang,
    namespace: "collection_page",
  });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      images: collections.map((collection) => collection.imageUrl),
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = validateLang((await params).locale);

  setRequestLocale(locale);
  return (
    <div className="bg-gradient-to-b from-card to-transparent">
      <CollectionCardsSection />
      <NewestProductsSection />
      <ContactSection />
    </div>
  );
}

function NewestProductsSection() {
  const t = useTranslations("collections_page");
  return (
    <section>
      <MaxWidthWrapper className="flex flex-col items-center gap-y-6 px-0 pt-12 md:gap-y-12">
        <H2>{t("our_newest_products")}</H2>
        <ProductsPreview orderBy="new" />
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
      </MaxWidthWrapper>
    </section>
  );
}
