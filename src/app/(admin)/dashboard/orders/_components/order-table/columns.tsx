"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { OrderTableSettings } from "./table-settings";
import { formatPrice } from "@/lib/utils";
import type { OrderAdminDTO } from "@/server/modules/admin/order-admin/order-admin.types";
export const orderColumns: ColumnDef<OrderAdminDTO>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p>{row.original.contactInfo?.email ?? "-"}</p>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge
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
    accessorKey: "created",
    header: "Crated",
    cell: ({ row }) => (
      <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <p>{formatPrice(row.original.totalPrice)}</p>,
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
