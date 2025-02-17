import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, H3, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Link, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAllCollections } from "@/server/api/routers/lib/collections";

export async function CollectionsPreviewSection({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: "home.collections" });
  const collections = await getAllCollections({
    locale,
    take: 4,
    skip: 0,
    order: "asc",
  });

  return (
    <section className="w-full pt-12 lg:pt-20">
      <MaxWidthWrapper className="space-y-8 px-0 lg:space-y-12">
        <div className="px-2.5 lg:space-y-2">
          <H2>{t("title")}</H2>
          <Text
            size="subtitle"
            variant="muted"
            className="mx-auto hidden max-w-5xl text-center lg:block"
          >
            {t("subtitle")}
          </Text>
        </div>
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
          {collections.map(({ slug, name, imageUrl }, i) => (
            <Link
              locale={locale}
              href={`/collections/${slug}`}
              key={i}
              className="group relative grid aspect-square min-w-[300px] place-items-center overflow-hidden"
            >
              <Image
                fill
                priority
                sizes="(min-width: 1400px) 321px, 296px"
                src={imageUrl}
                alt="image of collection"
                className="absolute object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              <H3 className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-nowrap capitalize text-background lg:text-4xl">
                {name}
              </H3>

              <div className="absolute inset-0 z-10 backdrop-brightness-90 duration-300 ease-in-out group-hover:backdrop-brightness-75"></div>
            </Link>
          ))}
        </div>
        <div className="mx-auto max-w-[1400px] px-2.5">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
