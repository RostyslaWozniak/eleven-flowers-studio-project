import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { H1, Text } from "@/components/ui/typography";
import Image from "next/image";

export function HomeHeroSection() {
  return (
    <section>
      <MaxWidthWrapper className="hidden items-center justify-between gap-8 md:flex md:pt-12">
        <div className="flex flex-col items-start gap-6">
          <div className="flex-col gap-4">
            <H1 className="text-nowrap">
              Eleven Flowers Studio – <br></br> Idealne prezenty dla Ciebie
            </H1>
            <Text size="subtitle">
              W naszym studiu florystycznym wierzymy w tworzenie zachwycających
              kompozycji kwiatowych, które opowiadają historię.
            </Text>
          </div>
          <div className="flex items-center gap-8">
            <Button>Zamów kwiaty</Button>
            <Button variant="outline">Zobacz kolekcje</Button>
          </div>
        </div>

        <Image
          priority
          className="rounded-sm"
          src="/images/hero.jpg"
          alt="Eleven Flowers Studio"
          width={500}
          height={500}
        />
      </MaxWidthWrapper>
      <div className="relative md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Eleven Flowers Studio"
          width={550}
          height={650}
        />
        <div className="absolute -bottom-0 flex h-60 w-full items-end justify-center bg-gradient-to-b from-transparent via-background/30 to-background px-2.5">
          <Button variant="outline">Zamów kwiaty</Button>
        </div>
      </div>
    </section>
  );
}
