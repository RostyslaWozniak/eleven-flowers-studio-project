"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons/table-skeleton";
import { api } from "@/trpc/react";
import { orderColumns } from "./columns";
import { useQueryState } from "nuqs";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";

const ORDERS_PER_PAGE = 10;

const FILTERS = [
  { label: "Coming", value: "coming" },
  { label: "Today", value: "today" },
  { label: "All", value: "all" },
] as const;

export function OrderTable() {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [filter, setFilter] = useQueryState<"coming" | "today" | "all">(
    "filter",
    {
      defaultValue: "coming",

      parse: (value) => {
        if (value === "coming" || value === "today") return value;
        return null;
      },
    },
  );

  const { data, isPending } = api.admin.orders.getAll.useQuery({
    take: ORDERS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * ORDERS_PER_PAGE,
    filter: filter === "all" ? undefined : filter,
  });

  return (
    <>
      <H1 className="mb-10">
        Orders {data && <span className="font-manrope">({data.count})</span>}
      </H1>
      <div className="mb-4">
        {FILTERS.map(({ label, value }) => (
          <Button
            key={label}
            size="sm"
            variant={filter === value ? "outline" : "ghost"}
            onClick={() => {
              void setPage("1");
              void setFilter(value === "all" ? "all" : value);
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
