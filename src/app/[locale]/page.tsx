// import { routing } from "@/i18n/routing";
import {
  BenefitsSection,
  HomeHeroSection,
  FaqSection,
  ContactSection,
  TestemonialsSection,
} from "../_components/sections";
import { MostPopularProductsSection } from "../_components/sections/most-popular-products-section";
import { validateLang } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";
import { CollectionCardsPreviewSection } from "@/features/collections/components/sections/collection-cards-preview.section";

export const dynamic = "force-static";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = validateLang((await params).locale);

  setRequestLocale(locale);
  return (
    <>
      <HomeHeroSection />
      <BenefitsSection />
      <CollectionCardsPreviewSection />
      <MostPopularProductsSection />
      <TestemonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
