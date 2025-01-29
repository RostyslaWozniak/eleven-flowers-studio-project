import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { Text } from "@/components/ui/typography";
import Markdown from "react-markdown";

export function FaqAccordion() {
  const t = useTranslations("HomePage.FAQSection");

  const questions = [
    {
      question: t("questions.0.question"),
      answer: (
        <Markdown className="prose prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:prose-lg lg:min-w-[900px]">
          {t("questions.0.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.1.question"),
      answer: (
        <Markdown className="prose prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:prose-lg lg:min-w-[900px]">
          {t("questions.1.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.2.question"),
      answer: (
        <Markdown className="prose prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:prose-lg lg:min-w-[900px]">
          {t("questions.2.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.3.question"),
      answer: (
        <Markdown className="prose prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:prose-lg lg:min-w-[900px]">
          {t("questions.3.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.4.question"),
      answer: (
        <Markdown className="prose prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:prose-lg lg:min-w-[900px]">
          {t("questions.4.answer")}
        </Markdown>
      ),
    },
  ];
  return (
    <Accordion type="single" collapsible className="mx-auto w-full max-w-5xl">
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
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
