"use client";

import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";
import { columns } from "./columns";
import Pagination from "@/components/pagination";

const PRODUCTS_PER_PAGE = 10;

export function ProductsTable() {
  const [page] = useQueryState("page", { defaultValue: "1" });
  const { data, isPending } = api.admin.products.getAll.useQuery({
    take: PRODUCTS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
  });

  return (
    <div className="py-10">
      {data === undefined || isPending ? (
        <DataTableSkeleton rows={12} showPagination />
      ) : (
        <>
          <DataTable columns={columns} data={data.products} />
          <div className="mt-4">
            <Pagination
              totalPages={Math.ceil(data.productsCount / PRODUCTS_PER_PAGE)}
            />
          </div>
        </>
      )}
    </div>
  );
}
