import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function H4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4 className={cn("text-xl font-semibold sm:text-2xl", className)}>
      {children}
    </h4>
  );
}
