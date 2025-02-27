import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CollectionTable } from "./_components/collection-table";
import { api } from "@/trpc/server";
import { columns } from "./_components/collection-table/columns";

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
