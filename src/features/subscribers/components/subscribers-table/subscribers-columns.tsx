"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Subscriber } from "../types/subscriber.type";

export const subscriberColumns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "number",
    header: "Nº",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone,
  },
];
