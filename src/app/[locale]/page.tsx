import { routing } from "@/i18n/routing";
import {
  BenefitsSection,
  HomeHeroSection,
  CollectionsPreviewSection,
  FaqSection,
  ContactSection,
  TestemonialsSection,
} from "../_components/sections";
// import dynamic from "next/dynamic";
import { MostPopularProductsSection } from "../_components/sections/most-popular-products-section";

// const TestemonialsSection = dynamic(() =>
//   import("../_components/sections").then((mod) => mod.TestemonialsSection),
// );

export const dynamic = "force-static";

export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home() {
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
