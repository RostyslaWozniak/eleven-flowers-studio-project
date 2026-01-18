import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "./ui/badge";
import { Link } from "@/i18n/routing";

type LinkBadgeProps = BadgeProps & {
  href: string;
};

export function LinkBadge({
  href,
  className,
  children,
  variant = "outline",
  ...props
}: LinkBadgeProps) {
  return (
    <Badge className={cn("relative", className)} variant={variant} {...props}>
      <Link
        href={href}
        className="absolute inset-0 min-h-[44px] min-w-[44px]"
      />
      {children}
    </Badge>
  );
}
