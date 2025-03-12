import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

import { CollectionsPreview } from "@/components/collections-preview";

export async function CollectionsPreviewSection() {
  const t = await getTranslations("home.collections");

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
        <CollectionsPreview take={4} />

        <div className="mx-auto max-w-[1400px] px-2.5">
          <Separator />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
