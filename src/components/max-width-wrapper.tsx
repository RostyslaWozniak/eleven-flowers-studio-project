import { cn } from "@/lib/utils";

export function MaxWidthWrapper({
  children,
  className,
  border,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-[1400px] px-2.5", className)}>
      {children}
      {border && <div className="h-px w-full bg-primary"></div>}
    </div>
  );
}
