import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const maxWidthWraperVariants = cva("mx-auto px-4 md:px-4", {
  variants: {
    size: {
      default: "max-w-[1400px]",
      xs: "max-w-2xl",
      sm: "max-w-4xl",
      md: "max-w-6xl",
      lg: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type MaxWidthWrapperProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof maxWidthWraperVariants>;

export function MaxWidthWrapper({
  children,
  className,
  size,
}: MaxWidthWrapperProps) {
  return (
    <div className={cn(maxWidthWraperVariants({ size }), className)}>
      {children}
    </div>
  );
}
