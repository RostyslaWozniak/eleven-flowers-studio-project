import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  /**
   * Number of rows to display
   * @default 5
   */
  rows?: number;
  /**
   * Column configuration with width percentages or fixed widths
   * @default [{ width: "30%" }, { width: "25%" }, { width: "25%" }, { width: "20%" }]
   */
  columns?: Array<{
    width?: string;
    header?: boolean;
    className?: string;
  }>;
  /**
   * Whether to show headers
   * @default true
   */
  showHeader?: boolean;
  /**
   * Whether to show a checkbox column
   * @default false
   */
  showCheckbox?: boolean;
  /**
   * Whether to show an actions column
   * @default false
   */
  showActions?: boolean;
  /**
   * Custom class name for the table container
   */
  className?: string;
  /**
   * Density of the table rows
   * @default "default"
   */
  density?: "compact" | "default" | "comfortable";
}

const defaultColumns = [
  { width: "30%" },
  { width: "25%" },
  { width: "25%" },
  { width: "20%" },
];

export function TableSkeleton({
  rows = 5,
  columns = defaultColumns,
  showHeader = true,
  showCheckbox = false,
  showActions = false,
  className,
  density = "default",
}: TableSkeletonProps) {
  const heightClass = {
    compact: "h-3",
    default: "h-4",
    comfortable: "h-5",
  };

  const paddingClass = {
    compact: "py-2",
    default: "py-3",
    comfortable: "py-4",
  };

  return (
    <div className={cn("w-full rounded-lg border", className)}>
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {showCheckbox && (
                <TableHead className="w-12">
                  <Skeleton className="h-4 w-4 rounded" />
                </TableHead>
              )}
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  style={{ width: column.width }}
                  className={column.className}
                >
                  <Skeleton className={cn("w-3/4", heightClass[density])} />
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              {showCheckbox && (
                <TableCell className={paddingClass[density]}>
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
              )}
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{ width: column.width }}
                  className={cn(paddingClass[density], column.className)}
                >
                  <Skeleton
                    className={cn(
                      heightClass[density],
                      // Vary widths for visual interest
                      colIndex === 0
                        ? "w-full"
                        : colIndex % 2 === 0
                          ? "w-3/4"
                          : "w-1/2",
                    )}
                  />
                </TableCell>
              ))}
              {showActions && (
                <TableCell className={cn("text-right", paddingClass[density])}>
                  <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Pre-configured variants for common use cases
export function SimpleTableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  const columnConfig = Array.from({ length: columns }).map(() => ({
    width: `${100 / columns}%`,
  }));

  return (
    <TableSkeleton rows={rows} columns={columnConfig} className={className} />
  );
}

export function DataTableSkeleton({
  rows = 10,
  showToolbar = false,
  showPagination = false,
  className,
}: {
  rows?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar skeleton */}
      {showToolbar && (
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      )}

      {/* Table skeleton */}
      <TableSkeleton
        rows={rows}
        columns={[
          { width: "35%" },
          { width: "20%" },
          { width: "15%" },
          { width: "15%" },
          { width: "15%" },
        ]}
        showCheckbox
        showActions
      />

      {/* Pagination skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      )}
    </div>
  );
}

export function CardTableSkeleton({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 shadow-sm", className)}>
      {/* Card header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Table */}
      <TableSkeleton
        rows={rows}
        columns={[
          { width: "40%" },
          { width: "20%" },
          { width: "20%" },
          { width: "20%" },
        ]}
        className="border-0"
      />
    </div>
  );
}
