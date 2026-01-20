"use client";

import { columns } from "@/features/collections/components/collection-table/columns";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";
import { DataTable } from "@/components/data-table";

export function CollectionTable() {
  const { data, isPending } = api.admin.collections.getAll.useQuery();

  return (
    <div className="py-10">
      {data === undefined || isPending ? (
        <DataTableSkeleton rows={5} />
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
