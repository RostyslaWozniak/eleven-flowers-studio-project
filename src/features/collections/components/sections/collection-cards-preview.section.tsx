import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2 } from "@/components/ui/typography";
// import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

import { CollectionCards } from "@/features/collections/components/collection-cards";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/section-heading";

export async function CollectionCardsPreviewSection() {
  const t = await getTranslations("home.collections");

  return (
    <SectionWrapper>
      <MaxWidthWrapper className="space-y-8 lg:space-y-12">
        <SectionHeading
          heading={H2}
          title={t("title")}
          description={t("subtitle")}
          showMoreHref="/collections"
          descriptionClassName="line-clamp-2"
        />
        {/* <div className="px-2.5 lg:space-y-2">
          <H2>{t("title")}</H2>
          <Text
            size="subtitle"
            variant="muted"
            className="mx-auto hidden max-w-5xl text-center lg:block"
          >
            {t("subtitle")}
          </Text>
        </div> */}
        <CollectionCards take={4} />

        {/* <div className="mx-auto max-w-[1400px] px-2.5">
          <Separator />
        </div> */}
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
