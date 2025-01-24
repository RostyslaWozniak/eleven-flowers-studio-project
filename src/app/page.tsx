import {
  BenefitsSection,
  HomeHeroSection,
  CollectionsPreviewSection,
  MostPopularProductsSection,
  TestemonialsSection,
  FaqSection,
  ContactSection,
} from "./_components/sections";

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
