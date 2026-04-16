"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, Settings } from "lucide-react";
import { OrderTableSettings } from "./table-settings";
import { formatPrice } from "@/lib/utils";
import type { OrderAdminDTO } from "@/server/modules/admin/order-admin/order-admin.types";
import { isSameDay } from "date-fns";
export const orderColumns: ColumnDef<OrderAdminDTO>[] = [
  {
    accessorKey: "todays",
    header: "Is Today",
    cell: ({ row }) => {
      const today = new Date();
      return row.original.deliveryDetails &&
        isSameDay(row.original.deliveryDetails?.deliveryDate, today) ? (
        <CheckIcon className="stroke-emerald-500 stroke-[3px]" />
      ) : null;
    },
  },
  {
    accessorKey: "email",
    header: () => <p className="hidden lg:block">Email</p>,
    cell: ({ row }) => (
      <p className="hidden lg:block">
        {row.original.contactInfo?.email ?? "-"}
      </p>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="hidden lg:block">Payment Status</div>,
    cell: ({ row }) => (
      <Badge
        className="hidden lg:inline"
        variant={
          row.original.paymentStatus === "SUCCESS"
            ? "success"
            : row.original.paymentStatus === "PENDING"
              ? "warning"
              : "destructive"
        }
      >
        {row.original.paymentStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery date",
    cell: ({ row }) => (
      <p>
        {row.original.deliveryDetails?.deliveryDate
          ? new Date(
              row.original.deliveryDetails?.deliveryDate,
            ).toLocaleDateString()
          : "No date."}
      </p>
    ),
  },
  {
    accessorKey: "created",
    header: () => <div className="hidden lg:block">Created</div>,
    cell: ({ row }) => (
      <p className="hidden lg:block">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="hidden lg:block">Price</div>,
    cell: ({ row }) => (
      <p className="hidden lg:block">
        {formatPrice(row.original.totalPrice + row.original.deliveryPrice)}
      </p>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div>
        <OrderTableSettings order={row.original} />
      </div>
    ),
  },
];
