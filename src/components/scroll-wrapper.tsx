import { cn } from "@/lib/utils";

type ScrollWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollWrapper({ children, className }: ScrollWrapperProps) {
  return (
    <div
      className={cn("-mx-4 flex gap-4 overflow-x-scroll px-4", className)}
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {children}
    </div>
  );
}
