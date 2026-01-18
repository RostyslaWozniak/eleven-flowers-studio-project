import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva("", {
  variants: {
    paddingBlock: {
      default: "py-12 md:py-20 scroll-m-16 md:scroll-m-22",
      none: "py-0 scroll-m-2 md:scroll-m-4",
      sm: "py-10 md:py-16 scroll-m-12 md:scroll-m-20",
      lg: "py-16 md:py-28 scroll-m-20 md:scroll-m-24",
    },
  },
  defaultVariants: {
    paddingBlock: "default",
  },
});

type SectionWrapperProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof sectionVariants>;

export function SectionWrapper({
  children,
  className,
  paddingBlock,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn(sectionVariants({ paddingBlock }), className)}
      {...props}
    >
      {children}
    </section>
  );
}
