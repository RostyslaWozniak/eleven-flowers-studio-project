// "use client";

// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { api } from "@/trpc/react";
// import { useQueryState } from "nuqs";
// import { DataTable } from "@/components/data-table";

// const PRODUCTS_PER_PAGE = 10;

// export function ProductsTable() {

// const [page] = useQueryState("page", {defaultValue: "1"})
//     const { data } = api.admin.products.getAll.useQuery({
//       take: PRODUCTS_PER_PAGE,
//       skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
//     });

//   return (
//     <div className="rounded-md border">
//       <DataTable data={data?.products}
//     </div>
//   );
// }
