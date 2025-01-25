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
        "text-center font-philosopher text-4xl font-bold text-primary md:text-center lg:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
