import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "Czy mogę spersonalizować swój bukiet?",
    answer:
      "Oczywiście! Dostosowujemy każdą kompozycję do indywidualnych potrzeb i preferencji klienta. Wystarczy, że podasz nam szczegóły.",
  },
  {
    question: "Jak długo trwa dostawa?",
    answer:
      "Oczywiście! Dostosowujemy każdą kompozycję do indywidualnych potrzeb i preferencji klienta. Wystarczy, że podasz nam szczegóły.",
  },
  {
    question: "Czy oferujecie abonament kwiatowy?",
    answer:
      "Oczywiście! Dostosowujemy każdą kompozycję do indywidualnych potrzeb i preferencji klienta. Wystarczy, że podasz nam szczegóły.",
  },
  {
    question: "Jakie metody płatności akceptujecie?",
    answer:
      "Oczywiście! Dostosowujemy każdą kompozycję do indywidualnych potrzeb i preferencji klienta. Wystarczy, że podasz nam szczegóły.",
  },
  {
    question: "Czy mogę zamówić kwiaty na konkretną godzinę?",
    answer:
      "Oczywiście! Dostosowujemy każdą kompozycję do indywidualnych potrzeb i preferencji klienta. Wystarczy, że podasz nam szczegóły.",
  },
];

export function FaqSection() {
  return (
    <section>
      <MaxWidthWrapper border>
        <div className="space-y-6 pb-20 md:space-y-14">
          <H2>FAQ – Najczęściej zadawane pytania</H2>
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
                  <Text size="lg">{answer}</Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
