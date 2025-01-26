/* eslint-disable @next/next/no-img-element */
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, H3, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export function CollectionsPreviewSection() {
  const t = useTranslations("HomePage.CollectionsSection");

  const collections = [
    {
      img: "/images/bouquets.png",
      title: t("collections.bouquets"),
      href: "/collections/bouquets",
    },
    {
      img: "/images/flower-box.png",
      title: t("collections.flowerBox"),
      href: "/collections/flower-box",
    },
    {
      img: "/images/balloons.png",
      title: t("collections.balloons"),
      href: "/collections/balloons",
    },
    {
      img: "/images/gift.png",
      title: t("collections.gifts"),
      href: "/collections/gifts",
    },
  ];
  return (
    <section className="w-full pt-12 lg:pt-20">
      <MaxWidthWrapper className="space-y-8 lg:space-y-12">
        <div className="lg:space-y-2">
          <H2>{t("title")}</H2>
          <Text
            size="subtitle"
            variant="muted"
            className="mx-auto hidden max-w-5xl text-center lg:block"
          >
            {t("subtitle")}
          </Text>
        </div>
        {/* DESKTOP */}
        <div className="hidden grid-cols-4 gap-4 lg:grid">
          {collections.map(({ img, title, href }, i) => (
            <Link
              href={href}
              key={i}
              className="group relative grid aspect-square place-items-center overflow-hidden"
            >
              <img
                src={img}
                alt={title}
                width={350}
                height={350}
                className="absolute transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <H3 className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-nowrap text-background lg:text-4xl">
                {title}
              </H3>
              <div className="absolute inset-0 z-10 backdrop-brightness-90 duration-300 ease-in-out group-hover:backdrop-brightness-75"></div>
            </Link>
          ))}
        </div>
        {/* MOBILE */}
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 pb-8 lg:hidden">
          {collections.map(({ img, title, href }, i) => (
            <Link href={href} key={i}>
              <div className="group relative grid aspect-square w-[300px] place-items-center overflow-hidden xl:hidden">
                <img
                  src={img}
                  alt={title}
                  width={300}
                  height={300}
                  className="absolute w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <H3 className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-nowrap text-background">
                  {title}
                </H3>
                <div className="absolute inset-0 z-10 backdrop-brightness-[0.8] duration-300 ease-in-out group-hover:backdrop-brightness-50"></div>
              </div>
            </Link>
          ))}
        </div>
        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px]">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
