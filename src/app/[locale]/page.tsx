import { routing } from "@/i18n/routing";
import {
  BenefitsSection,
  HomeHeroSection,
  CollectionsPreviewSection,
  MostPopularProductsSection,
  TestemonialsSection,
  FaqSection,
  ContactSection,
} from "../_components/sections";
import { setRequestLocale } from "next-intl/server";
import { api } from "@/trpc/server";

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
    locale,
    take: 4,
    orderBy: "popularity",
  });
  return (
    <>
      <HomeHeroSection />
      <BenefitsSection />
      <CollectionsPreviewSection />
      <MostPopularProductsSection products={products} />
      <TestemonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
