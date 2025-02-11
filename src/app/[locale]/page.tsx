import { routing } from "@/i18n/routing";
import {
  BenefitsSection,
  HomeHeroSection,
  CollectionsPreviewSection,
  TestemonialsSection,
  FaqSection,
  ContactSection,
} from "../_components/sections";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { api } from "@/trpc/server";
import { ProductsPreview } from "@/components/product/products-preview";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { products } = await api.public.products.getAllProducts({
    take: 4,
    orderBy: "popularity",
  });

  const t = await getTranslations({
    locale,
    namespace: "home",
  });
  return (
    <>
      <HomeHeroSection />
      <BenefitsSection />
      <CollectionsPreviewSection />
      <ProductsPreview
        title={t("popular_products.title")}
        products={products}
        href="/products?sort=popular"
        separator
      />
      <TestemonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
