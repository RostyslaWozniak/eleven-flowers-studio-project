"use client";

import { Link } from "@/i18n/routing";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { CollectionTableSettings } from "./table-settings";
import { type AdminCollectionDto } from "@/server/api/routers/admin/types/collection-types";
export const columns: ColumnDef<AdminCollectionDto>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        width={50}
        height={50}
        className="aspect-square w-12 object-cover"
        src={row.original.imageUrl}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original.slug}`}
        className="text-nowrap hover:underline"
      >
        {row.original.name[0]?.name}
      </Link>
    ),
  },
  {
    accessorKey: "collection",
    header: "Collection",
    cell: ({ row }) => (
      <Link href={`/collections/${row.original.slug}`}>
        <Badge className="text-nowrap bg-primary text-primary-foreground hover:opacity-80">
          {row.original.name[0]?.name}
        </Badge>
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="px-8">{row.original.description[0]?.description}</p>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div>
        <CollectionTableSettings collection={row.original} />
      </div>
    ),
  },
];
