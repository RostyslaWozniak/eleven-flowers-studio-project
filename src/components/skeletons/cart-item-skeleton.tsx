import { Skeleton } from "../ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex w-full items-end justify-between border-b border-gray-200 py-4">
      <Skeleton className="aspect-square h-20 rounded-none" />
      <div className="flex flex-grow flex-col justify-center gap-y-5 px-4">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-7 w-40" />
    </div>
  );
}
