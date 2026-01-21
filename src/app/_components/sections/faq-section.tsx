import { Markdown } from "@/components/markdown-renderer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H2, Text } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
// import Markdown from "react-markdown";

export function FaqSection() {
  const t = useTranslations("home.faq");

  const questions = [
    {
      question: t("questions.0.question"),
      answer: <Markdown>{t("questions.0.answer")}</Markdown>,
    },
    {
      question: t("questions.1.question"),
      answer: <Markdown>{t("questions.1.answer")}</Markdown>,
    },
    {
      question: t("questions.2.question"),
      answer: <Markdown>{t("questions.2.answer")}</Markdown>,
    },
    {
      question: t("questions.3.question"),
      answer: <Markdown>{t("questions.3.answer")}</Markdown>,
    },
    {
      question: t("questions.4.question"),
      answer: <Markdown>{t("questions.4.answer")}</Markdown>,
    },
  ];
  return (
    <section className="w-full py-12 lg:pt-20">
      <MaxWidthWrapper className="space-y-6 md:space-y-14">
        <H2>
          FAQ – <br /> {t("title")}
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
              <AccordionContent className="text-base">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MaxWidthWrapper>
    </section>
  );
}
