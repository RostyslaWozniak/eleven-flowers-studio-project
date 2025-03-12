import { ContactSection } from "@/app/_components/sections";
import { CollectionsPreview } from "@/components/collections-preview";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H1, H2, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { validateLang } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export const revalidate = 604800; // 7 days

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

export default async function Page() {
  return (
    <div className="bg-gradient-to-b from-card to-transparent">
      <CollectionsSection />
      <NewestProductsSection />
      <ContactSection />
    </div>
  );
}

async function CollectionsSection() {
  const t = await getTranslations("collections_page");

  return (
    <section>
      <MaxWidthWrapper className="px-0">
        <div className="space-y-2 py-12">
          <H1 className="text-center">{t("title")}</H1>
          <Text size="subtitle" className="mx-auto text-center" variant="muted">
            {t("subtitle")}
          </Text>
        </div>
        <CollectionsPreview take={4} />

        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
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
