"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";
import { api } from "@/trpc/react";
import { orderColumns } from "./columns";
import { useQueryState } from "nuqs";
import Pagination from "@/components/pagination";

const ORDERS_PER_PAGE = 10;

export function OrderTable() {
  const [page] = useQueryState("page", { defaultValue: "1" });
  const { data, isPending } = api.admin.orders.getAll.useQuery({
    take: ORDERS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * ORDERS_PER_PAGE,
  });

  return (
    <div className="py-10">
      {data === undefined || isPending ? (
        <DataTableSkeleton rows={ORDERS_PER_PAGE} showPagination />
      ) : (
        <>
          <DataTable columns={orderColumns} data={data.orders} />
          <div className="mt-4">
            <Pagination totalPages={Math.ceil(data.count / ORDERS_PER_PAGE)} />
          </div>
        </>
      )}
    </div>
  );
}
