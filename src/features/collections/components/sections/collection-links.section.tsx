import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getCollections } from "../../cache/get-collections";
import { getLocale, getTranslations } from "next-intl/server";
import { CollectionLinks } from "../collection-links";
import { validateLang } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { SectionWrapper } from "@/components/section-wrapper";

const COLLLECTION_DEFAULT_LENGTH = 5;

export async function CollectionLinksSection({
  currCollectionSlug,
}: {
  currCollectionSlug?: string;
}) {
  const locale = await getLocale().then(validateLang);
  const t = await getTranslations("product");
  const collections = await getCollections({ locale });

  return (
    <SectionWrapper>
      <MaxWidthWrapper className="space-y-4">
        <SectionHeading
          title={t("collections")}
          showMoreHref={
            collections.length > COLLLECTION_DEFAULT_LENGTH
              ? "/collections"
              : undefined
          }
        />
        <CollectionLinks
          collections={collections}
          currCollectionSlug={currCollectionSlug}
        />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
