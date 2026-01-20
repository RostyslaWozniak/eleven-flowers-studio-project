import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CollectionTable } from "@/features/collections/components/collection-table";

export default function CollectionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <H1>Collections</H1>
        <Link
          href="/dashboard/collections/new"
          className={cn(buttonVariants({ variant: "default", size: "md" }))}
        >
          + Add New Collection
        </Link>
      </div>
      <CollectionTable />
    </div>
  );
}
