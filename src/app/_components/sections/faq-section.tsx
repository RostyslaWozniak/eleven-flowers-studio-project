import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2 } from "@/components/ui/typography";

import { FaqAccordion } from "../faq-accrdion/faq-accordion";
import { useTranslations } from "next-intl";

export function FaqSection() {
  const t = useTranslations("HomePage.FAQSection");
  return (
    <section className="w-full py-12 lg:pt-20">
      <MaxWidthWrapper className="space-y-6 md:space-y-14">
        <H2>
          FAQ – <br /> {t("title")}
        </H2>
        <FaqAccordion />
      </MaxWidthWrapper>
    </section>
  );
}
