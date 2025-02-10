import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { H1, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

export function NotFoundSection() {
  const t = useTranslations("not_found");
  return (
    <section>
      <MaxWidthWrapper className="flex min-h-[600px] flex-col items-center justify-center">
        <H1 className="text-9xl lg:text-9xl">404</H1>
        <Text size="subtitle" variant="muted" className="mb-8 mt-4">
          {t("description")}
        </Text>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          {t("button")}
        </Link>
      </MaxWidthWrapper>
    </section>
  );
}
