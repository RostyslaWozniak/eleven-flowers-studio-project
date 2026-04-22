import { cn } from "@/lib/utils";

export function ToggleAnimation({
  firstComp,
  secondComp,
  isActive,
  className,
  firstCompClassName,
  secondCompClassName,
}: {
  firstComp: React.ReactNode;
  secondComp: React.ReactNode;
  isActive: boolean;
  className?: string;
  firstCompClassName?: string;
  secondCompClassName?: string;
}) {
  return (
    <div className={cn("", className)}>
      <div
        className={cn(
          "absolute flex h-full w-full items-center justify-center transition-transform duration-500",
          firstCompClassName,
          {
            "rotate-180 scale-0": isActive,
            "scale-100": !isActive,
          },
        )}
      >
        {firstComp}
      </div>
      <div
        className={cn(
          "absolute flex h-full w-full items-center justify-center transition-transform duration-500",
          secondCompClassName,
          {
            "rotate-0": isActive,
            "-rotate-180 scale-0": !isActive,
          },
        )}
      >
        {secondComp}
      </div>
    </div>
  );
}
