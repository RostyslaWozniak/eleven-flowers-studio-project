import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1, Text } from "@/components/ui/typography";
import { CollectionCards } from "../collection-cards";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export function CollectionCardsSection() {
  const t = useTranslations("collections_page");

  return (
    <section>
      <MaxWidthWrapper className="px-0">
        <div className="space-y-2 py-12">
          <H1 className="text-center">{t("title")}</H1>
          <Text size="subtitle" className="mx-auto text-center" variant="muted">
            {t("subtitle")}
          </Text>
        </div>
        <CollectionCards />

        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
