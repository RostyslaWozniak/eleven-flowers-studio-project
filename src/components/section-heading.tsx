import { type H1, H2, type H3 } from "./ui/typography";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  heading?: typeof H1 | typeof H2 | typeof H3;
  title: string;
  description?: string;
  showMoreHref?: string;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  title,
  description,
  heading: H = H2,
  headingClassName,
  descriptionClassName,
  showMoreHref,
  className,
}: SectionHeadingProps) {
  const t = useTranslations("product");
  return (
    <div className="mb-4 border-b border-border pb-2 md:pb-4">
      <div
        className={cn("flex items-center justify-between gap-x-4", className, {
          "items-end": description,
        })}
      >
        <div>
          <H className={cn("text-start", headingClassName)}>{title}</H>
          {description && (
            <>
              <div className="h-0.5 w-12 bg-primary" />
              <p
                className={cn(
                  "max-w-screen-md pt-2 text-sm text-muted-foreground md:text-base",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            </>
          )}
        </div>
        {showMoreHref && (
          <Link
            href={showMoreHref}
            className="mt-1 inline-flex items-center text-nowrap text-xs font-medium text-primary transition-colors hover:text-foreground md:text-sm"
          >
            {t("see_more")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
