"use client";

import { Link } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { ProductTableSettings } from "./table-settings";
import { StatusSelect } from "./status-select";
import type { ProductAdminDTO } from "@/server/modules/admin/product-admin/product-admin.types";
export const columns: ColumnDef<ProductAdminDTO>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        width={50}
        height={50}
        className="aspect-square w-12 object-cover"
        src={row.original.images[0]}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original.collection?.slug}/${row.original.slug}`}
        className="hover:underline"
      >
        {row.original.name[0]?.name}
      </Link>
    ),
  },
  {
    accessorKey: "collection",
    header: "Collection",
    cell: ({ row }) => (
      <>
        {row.original.collection ? (
          <Link href={`/collections/${row.original.collection.slug}`}>
            <Badge className="bg-primary text-primary-foreground hover:opacity-80">
              {row.original.collection.name}
            </Badge>
          </Link>
        ) : (
          <Badge variant="destructive">N/A</Badge>
        )}
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusSelect id={row.original.id} status={row.original.status} />
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <div>
        {row.original.prices.map(({ size }, i) => (
          <p key={i}>{size.toUpperCase()}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        {row.original.prices.map(({ price }, i) => (
          <p key={i}>{formatPrice(price)}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div>
        <ProductTableSettings product={row.original} />
      </div>
    ),
  },
];
