import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { type CollectionDTO } from "../types/collection.types";

export function CollectionLinks({
  collections,
  currCollectionSlug,
}: {
  collections: CollectionDTO[];
  currCollectionSlug?: string;
}) {
  return (
    <div className="scrollbar-hide flex w-full space-x-4 overflow-x-scroll px-2.5">
      {collections.map(({ name, slug }) => (
        <Link
          href={`/collections/${slug}`}
          key={name}
          className={cn(
            buttonVariants({
              variant: currCollectionSlug === slug ? "outline" : "secondary",
            }),
            "px-4 text-sm lg:w-min",
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
