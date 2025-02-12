import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("aspect-square w-full", className)}>
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
