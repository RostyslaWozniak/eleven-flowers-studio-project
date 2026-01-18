import { type H1, H2, type H3 } from "./ui/typography";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  heading?: typeof H1 | typeof H2 | typeof H3;
  title: string;
  showMoreHref?: string;
  className?: string;
  headingClassName?: string;
};

export function SectionHeading({
  heading: H = H2,
  headingClassName,
  title,
  showMoreHref,
  className,
}: SectionHeadingProps) {
  const t = useTranslations("product");
  return (
    <div className={cn("mb-4 border-b border-border pb-2 md:pb-4", className)}>
      <div className="grid grid-cols-3 gap-4">
        <H className={cn("col-span-2 text-start text-2xl", headingClassName)}>
          {title}
        </H>
        {showMoreHref && (
          <Link
            href={showMoreHref}
            className="mb-1 inline-flex items-end justify-end gap-1 text-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:text-sm"
          >
            {t("see_more")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
