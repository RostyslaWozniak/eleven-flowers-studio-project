"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { OrderTableSettings } from "./table-settings";
import { cn, formatPrice } from "@/lib/utils";
import type { OrderAdminDTO } from "@/server/modules/admin/order-admin/order-admin.types";
import Link from "next/link";
import { env } from "@/env";
import { buttonVariants } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";

export const orderColumns: ColumnDef<OrderAdminDTO>[] = [
  {
    accessorKey: "number",
    header: "Nº",
    cell: ({ row }) => row.index + 1,
  },
  // {
  //   accessorKey: "todays",
  //   header: "Is Today",
  //   cell: ({ row }) => {
  //     const today = new Date();
  //     return row.original.deliveryDetails &&
  //       isSameDay(row.original.deliveryDetails?.deliveryDate, today) ? (
  //       <CheckIcon className="stroke-emerald-500 stroke-[3px]" />
  //     ) : null;
  //   },
  // },
  {
    accessorKey: "email",
    header: () => <p className="hidden sm:block">Email</p>,
    cell: ({ row }) => (
      <p className="hidden sm:block">
        {row.original.contactInfo?.email ?? "-"}
      </p>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="">Payment Status</div>,
    cell: ({ row }) => (
      <Badge
        className="min-h-3"
        variant={
          row.original.paymentStatus === "SUCCESS"
            ? "success"
            : row.original.paymentStatus === "PENDING"
              ? "warning"
              : "destructive"
        }
      >
        <p className="hidden lg:block">{row.original.paymentStatus}</p>
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
    header: () => <div className="hidden md:block">Price</div>,
    cell: ({ row }) => (
      <p className="hidden md:block">
        {formatPrice(row.original.totalPrice + row.original.deliveryPrice)}
      </p>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <SettingsIcon />,
    cell: ({ row }) => (
      <div>
        <Link
          href={`${env.NEXT_PUBLIC_SERVER_URL}/dashboard/orders/${row.original.id}`}
          className={cn(
            buttonVariants({ size: "sm", variant: "link" }),
            "border-none px-0 lg:hidden",
          )}
        >
          See more
        </Link>
        <div className="hidden lg:block">
          <OrderTableSettings order={row.original} />
        </div>
      </div>
    ),
  },
];
