import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";
import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

const Accordion = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.Accordion),
);
const AccordionContent = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionContent),
);
const AccordionItem = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionItem),
);
const AccordionTrigger = dynamic(() =>
  import("@/components/ui/accordion").then((mod) => mod.AccordionTrigger),
);

export async function FaqSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.faq" });

  const questions = [
    {
      question: t("questions.0.question"),
      answer: (
        <Markdown className="prose lg:prose-lg prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:min-w-[900px]">
          {t("questions.0.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.1.question"),
      answer: (
        <Markdown className="prose lg:prose-lg prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:min-w-[900px]">
          {t("questions.1.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.2.question"),
      answer: (
        <Markdown className="prose lg:prose-lg prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:min-w-[900px]">
          {t("questions.2.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.3.question"),
      answer: (
        <Markdown className="prose lg:prose-lg prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:min-w-[900px]">
          {t("questions.3.answer")}
        </Markdown>
      ),
    },
    {
      question: t("questions.4.question"),
      answer: (
        <Markdown className="prose lg:prose-lg prose-h3:text-xl prose-h3:leading-[1.1rem] prose-h3:text-foreground/80 lg:min-w-[900px]">
          {t("questions.4.answer")}
        </Markdown>
      ),
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
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MaxWidthWrapper>
    </section>
  );
}
