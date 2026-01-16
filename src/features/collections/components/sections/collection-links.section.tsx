import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2 } from "@/components/ui/typography";

import { getCollections } from "../../cache/get-collections";
import { getLocale, getTranslations } from "next-intl/server";
import { CollectionLinks } from "../collection-links";
import { validateLang } from "@/lib/utils";

export async function CollectionLinksSection({
  currCollectionSlug,
}: {
  currCollectionSlug?: string;
}) {
  const t = await getTranslations("product");
  const locale = await getLocale().then(validateLang);
  const collections = await getCollections({ locale });

  return (
    <section>
      <MaxWidthWrapper className="space-y-4 px-0 py-12">
        <div className="px-2.5">
          <H2 className="border-b pb-2 text-start md:text-start">
            {t("collections")}
          </H2>
        </div>
        <CollectionLinks
          collections={collections}
          currCollectionSlug={currCollectionSlug}
        />
      </MaxWidthWrapper>
    </section>
  );
}
