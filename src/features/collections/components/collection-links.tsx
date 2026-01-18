import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { type CollectionDTO } from "../types/collection.types";
import { ScrollWrapper } from "@/components/scroll-wrapper";

export function CollectionLinks({
  collections,
  currCollectionSlug,
}: {
  collections: CollectionDTO[];
  currCollectionSlug?: string;
}) {
  return (
    <ScrollWrapper>
      {collections.map(({ name, slug }) => (
        <Link
          href={`/collections/${slug}`}
          key={name}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),

            "px-4 text-sm lg:w-min",
            {
              "border-0 bg-slate-50": currCollectionSlug !== slug,
            },
          )}
        >
          {name}
        </Link>
      ))}
    </ScrollWrapper>
  );
}
