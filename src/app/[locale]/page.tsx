import { routing } from "@/i18n/routing";
import {
  BenefitsSection,
  HomeHeroSection,
  CollectionsPreviewSection,
  FaqSection,
  ContactSection,
  TestemonialsSection,
} from "../_components/sections";
import { MostPopularProductsSection } from "../_components/sections/most-popular-products-section";
import { validateLang } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = validateLang(locale);
  setRequestLocale(lang);
  return (
    <>
      <HomeHeroSection />
      <BenefitsSection />
      <CollectionsPreviewSection />
      <MostPopularProductsSection />
      <TestemonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
