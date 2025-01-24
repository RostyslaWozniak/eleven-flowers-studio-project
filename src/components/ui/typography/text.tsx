import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("leading-7 text-pretty font-manrope ", {
  variants: {
    size: {
      default: "text-base font-normal leading-relaxed tracking-wide",
      sm: "text-sm font-normal leading-relaxed  tracking-wider",
      lg: "text-lg font-semibold md:text-xl/relaxed tracking-wider",
      subtitle: "text-xl font-semibold md:text-2xl tracking-[2px] ",
    },
    variant: {
      default: "text-foreground",
      muted: "text-foreground/70 font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <p
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
