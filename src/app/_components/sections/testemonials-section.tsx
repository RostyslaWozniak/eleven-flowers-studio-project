import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileCarousel } from "@/components/mobile-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GoogleStars } from "@/components/ui/icons";
import { GoogleLogo } from "@/components/ui/icons/google-logo";
import { Separator } from "@/components/ui/separator";
import { H2, Text } from "@/components/ui/typography";
import { testemonials } from "@/data/testemonials";
import { useTranslations } from "next-intl";

export function TestemonialsSection() {
  const t = useTranslations("HomePage.TestemonialsSection");

  return (
    <section className="relative w-full overflow-hidden pt-12 lg:pt-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <GoogleStars className="hidden lg:flex" />
            <Text size="lg">5 Stars on</Text>
            <GoogleLogo />
          </div>
          <H2>{t("title")}</H2>
          <Text
            size="subtitle"
            className="mt-4 hidden max-w-3xl text-center lg:block"
          >
            {t("subtitle")}{" "}
            <span className="font-philosopher text-3xl font-semibold text-primary">
              Eleven Flowers Studio
            </span>
          </Text>
        </div>
        {/* DESKTOP */}
        <div className="hidden lg:block">
          <Carousel
            opts={{
              align: "center",
            }}
            className="relative flex select-none items-start gap-10 py-16 pb-32"
          >
            <CarouselContent>
              {testemonials.slice(0, 5).map(({ review, name }, i) => (
                <CarouselItem
                  key={i}
                  className="max-w-[450px] cursor-grab active:cursor-grabbing lg:basis-1/3"
                >
                  <div className="space-y-2 rounded-sm border shadow-lg lg:px-8 lg:py-6">
                    <GoogleStars />
                    <Text>{review}</Text>
                    <div className="mt-6 flex items-center gap-x-4">
                      <div className="rounded-full border-2 border-primary/70 p-2">
                        <GoogleLogo />
                      </div>
                      <Text size="lg">{name}</Text>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-8 right-0 h-12 w-20">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
        {/* MOBILE */}
        <div className="py-14 lg:hidden">
          <MobileCarousel className="select-none">
            {testemonials.slice(0, 5).map(({ review, name }, i) => (
              <CarouselItem
                key={i}
                className="basis-[88%] cursor-grab active:cursor-grabbing sm:basis-1/2 md:basis-1/3"
              >
                <div className="space-y-2 rounded-sm border px-4 py-3 shadow-lg">
                  <GoogleStars />
                  <Text>{review}</Text>
                  <div className="mt-6 flex items-center gap-x-4">
                    <GoogleLogo />
                    <Text size="lg">{name}</Text>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </MobileCarousel>
        </div>
      </MaxWidthWrapper>
      {/* SEPARATOR */}
      <div className="mx-auto max-w-[1400px] px-2.5 lg:px-0">
        <Separator />
      </div>
    </section>
  );
}
