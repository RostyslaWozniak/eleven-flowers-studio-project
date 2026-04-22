"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";
import { api } from "@/trpc/react";
import { orderColumns } from "./columns";
import { useQueryState } from "nuqs";
import Pagination from "@/components/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ORDERS_PER_PAGE = 10;

const FILTERS = [
  { label: "Coming", value: "coming" },
  { label: "Today", value: "today" },
  { label: "All", value: undefined },
] as const;

export function OrderTable() {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [filter, setFilter] = useState<"coming" | "today" | undefined>(
    "coming",
  );

  const { data, isPending } = api.admin.orders.getAll.useQuery({
    take: ORDERS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * ORDERS_PER_PAGE,
    filter,
  });

  return (
    <>
      <div className="mb-4">
        {FILTERS.map(({ label, value }) => (
          <Button
            key={label}
            size="sm"
            variant={filter === value ? "outline" : "ghost"}
            onClick={async () => {
              await setPage("1");
              setFilter(value);
            }}
          >
            {label}{" "}
          </Button>
        ))}
      </div>
      {data === undefined || isPending ? (
        <DataTableSkeleton rows={ORDERS_PER_PAGE} showPagination />
      ) : (
        <>
          <DataTable columns={orderColumns} data={data.orders} />
          {data.count / ORDERS_PER_PAGE > 1 && (
            <div className="mt-4">
              <Pagination
                totalPages={Math.ceil(data.count / ORDERS_PER_PAGE)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
