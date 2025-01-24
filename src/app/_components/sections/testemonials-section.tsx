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
import { H2, Text } from "@/components/ui/typography";
import { User } from "lucide-react";

const testemonials = [
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus quam malesuada est pellentesque rhoncus.",
    name: "Jan Kowalski",
  },
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus quam malesuada est pellentesque rhoncus.",
    name: "Jan Kowalski",
  },
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus quam malesuada est pellentesque rhoncus.",
    name: "Jan Kowalski",
  },
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus quam malesuada est pellentesque rhoncus.",
    name: "Jan Kowalski",
  },
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus quam malesuada est pellentesque rhoncus.",
    name: "Jan Kowalski",
  },
];

export function TestemonialsSection() {
  return (
    <section className="relative overflow-hidden">
      <MaxWidthWrapper border className="py-20">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <GoogleStars className="hidden md:flex" />
            <Text size="lg">5 Stars on</Text>
            <GoogleLogo />
          </div>
          <H2>Opinie naszych klientów</H2>
          <Text
            size="subtitle"
            className="mt-4 hidden max-w-3xl text-center md:block"
          >
            Odkryj szczere historie i entuzjastyczne recenzje tych, którzy
            doświadczyli piękna{" "}
            <span className="font-philosopher text-3xl font-semibold text-primary">
              Eleven Flowers Studio
            </span>
          </Text>
        </div>
        {/* DESKTOP */}
        <div className="hidden md:block">
          <Carousel
            opts={{
              align: "center",
            }}
            className="relative flex select-none items-start gap-10 py-16 pb-32"
          >
            <CarouselContent>
              {testemonials.map(({ review, name }, i) => (
                <CarouselItem
                  key={i}
                  className="basis-[80%] cursor-grab active:cursor-grabbing md:basis-1/2 lg:basis-1/3"
                >
                  <div className="space-y-2 rounded-sm border px-8 py-6 shadow-lg">
                    <GoogleStars />
                    <Text>{review}</Text>
                    <div className="mt-6 flex items-center gap-x-4">
                      <User
                        size={52}
                        className="rounded-full bg-primary stroke-primary-foreground p-2"
                      />
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
        <div className="py-8 md:hidden">
          <MobileCarousel>
            {testemonials.map(({ review, name }, i) => (
              <CarouselItem key={i} className="">
                <div className="space-y-2 rounded-sm border px-8 py-6 shadow-lg">
                  <GoogleStars />
                  <Text>{review}</Text>
                  <div className="mt-6 flex items-center gap-x-4">
                    <User
                      size={52}
                      className="rounded-full bg-primary stroke-primary-foreground p-2"
                    />
                    <Text size="lg">{name}</Text>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </MobileCarousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
