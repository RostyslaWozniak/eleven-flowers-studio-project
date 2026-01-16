import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { columns } from "@/features/collections/components/collection-table/columns";
import { CollectionTable } from "@/features/collections/components/collection-table";

export default async function CollectionsPage() {
  const data = await api.admin.collections.getAll();
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
      <div className="py-10">
        <CollectionTable columns={columns} data={data} />
      </div>
    </div>
  );
}
