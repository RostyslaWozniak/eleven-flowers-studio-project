import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileCarousel } from "@/components/mobile-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GoogleStars as GoogleStarsIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { H2, Text } from "@/components/ui/typography";
import { GoogleStars } from "../google-stars";
import { getTranslations } from "next-intl/server";
import { api } from "@/trpc/server";
import { Avatar } from "@/components/custom-ui/avatar";

export async function TestemonialsSection() {
  const t = await getTranslations("home.testimonials");

  const testemonialsData = await api.public.google.getTestmonials();

  return (
    <section className="relative w-full overflow-hidden pt-12 lg:pt-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center">
          <GoogleStars />

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
              {testemonialsData.reviews.map(({ text, name, photo }, i) => (
                <CarouselItem
                  key={i}
                  className="max-w-[450px] cursor-grab active:cursor-grabbing lg:basis-1/3"
                >
                  <div className="space-y-2 rounded-sm border shadow-lg lg:px-6 lg:py-6">
                    <div className="flex w-full items-center">
                      <Avatar photo={photo} name={name} />
                      <div>
                        <Text size="lg">{name}</Text>
                        <GoogleStarsIcon />
                      </div>
                    </div>

                    {/* <ExpandedText lines={4}>{text}</ExpandedText> */}
                    <Text>{text}</Text>
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
            {testemonialsData.reviews.map(({ text, name, photo }, i) => (
              <CarouselItem
                key={i}
                className="basis-[88%] cursor-grab active:cursor-grabbing sm:basis-1/2 md:basis-1/3"
              >
                <div className="space-y-2 rounded-sm border px-4 pb-6 shadow-lg">
                  <div className="mt-6 flex items-center gap-x-4">
                    <Avatar photo={photo} name={name} />
                    <div>
                      <Text size="lg" className="pl-2">
                        {name}
                      </Text>
                      <GoogleStarsIcon />
                    </div>
                  </div>
                  <Text>{text}</Text>
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
