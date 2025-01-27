import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function CollectionsSection({
  collections,
}: {
  collections: { name: string; slug: string }[];
}) {
  return (
    <section className="mb-12">
      <MaxWidthWrapper className="space-y-4">
        <H2 className="border-b pb-2 md:text-start">Categories</H2>
        <div className="flex space-x-4">
          {collections.map(({ name, slug }) => (
            <Link
              href={`/collections/${slug}`}
              key={name}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-min text-sm",
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
