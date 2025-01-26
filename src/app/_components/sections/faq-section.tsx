import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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
