import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-philosopher text-5xl font-normal tracking-tighter text-primary lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
