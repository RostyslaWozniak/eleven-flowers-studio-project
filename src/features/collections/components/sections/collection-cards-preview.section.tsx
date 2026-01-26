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
      <MaxWidthWrapper className="flex flex-col items-center gap-6 lg:gap-y-12">
        <div className="w-full">
          <SectionHeading
            heading={H2}
            title={t("title")}
            description={t("subtitle")}
            showMoreHref="/collections"
            descriptionClassName="line-clamp-2"
          />
        </div>

        <CollectionCards take={4} />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
