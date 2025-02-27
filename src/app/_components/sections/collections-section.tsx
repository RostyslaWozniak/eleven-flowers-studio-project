import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { type CollectionDTO } from "@/types";
import { useTranslations } from "next-intl";

export function CollectionsSection({
  collections,
  currCollectionSlug,
}: {
  collections: CollectionDTO[];
  currCollectionSlug?: string;
}) {
  const t = useTranslations("product");
  return (
    <section>
      <MaxWidthWrapper className="space-y-4 px-0 py-12">
        <div className="px-2.5">
          <H2 className="border-b pb-2 text-start md:text-start">
            {t("collections")}
          </H2>
        </div>
        <div className="scrollbar-hide flex w-full space-x-4 overflow-x-scroll px-2.5">
          {collections.map(({ name, slug }) => (
            <Link
              href={`/collections/${slug}`}
              key={name}
              className={cn(
                buttonVariants({
                  variant:
                    currCollectionSlug === slug ? "outline" : "secondary",
                }),
                "px-4 text-sm lg:w-min",
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
