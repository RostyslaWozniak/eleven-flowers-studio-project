import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function H3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-philosopher text-3xl font-semibold text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}
