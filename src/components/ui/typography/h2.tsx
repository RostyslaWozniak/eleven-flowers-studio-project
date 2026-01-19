import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-center font-philosopher text-2xl font-bold text-primary lg:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
