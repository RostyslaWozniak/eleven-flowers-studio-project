"use client";

import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { columns } from "@/features/collections/components/collection-table/columns";
import { CollectionTable } from "@/features/collections/components/collection-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";

export default function CollectionsPage() {
  const { data, isPending } = api.admin.collections.getAll.useQuery();
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
        {data === undefined || isPending ? (
          <DataTableSkeleton rows={5} />
        ) : (
          <CollectionTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
