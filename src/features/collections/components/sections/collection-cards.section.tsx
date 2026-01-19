import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1 } from "@/components/ui/typography";
import { CollectionCards } from "../collection-cards";
// import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/section-heading";
import { SectionWrapper } from "@/components/section-wrapper";

export function CollectionCardsSection() {
  const t = useTranslations("collections_page");

  return (
    <SectionWrapper>
      <MaxWidthWrapper>
        <SectionHeading
          heading={H1}
          title={t("title")}
          description={t("subtitle")}
        />
        <CollectionCards />

        {/* SEPARATOR */}
        {/* <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
          <Separator />
        </div> */}
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
