import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export function FaqSection() {
  const t = useTranslations("HomePage.FAQSection");

  const questions = [
    {
      question: t("questions.0.question"),
      answer: t("questions.0.answer"),
    },
    {
      question: t("questions.1.question"),
      answer: t("questions.1.answer"),
    },
    {
      question: t("questions.2.question"),
      answer: t("questions.2.answer"),
    },
    {
      question: t("questions.3.question"),
      answer: t("questions.3.answer"),
    },
    {
      question: t("questions.4.question"),
      answer: t("questions.4.answer"),
    },
  ];
  return (
    <section className="w-full pt-12 lg:pt-20">
      <MaxWidthWrapper className="space-y-6 md:space-y-14">
        <H2>
          FAQ – <br /> Najczęściej zadawane pytania
        </H2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-5xl"
        >
          {questions.map(({ question, answer }, i) => (
            <AccordionItem
              value={`item-${i}`}
              key={i}
              className="border-primary/20"
            >
              <AccordionTrigger>
                <Text size="subtitle" className="text-primary">
                  {question}
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text size="lg" variant="muted">
                  {answer}
                </Text>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px] pt-6 lg:pt-0">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
