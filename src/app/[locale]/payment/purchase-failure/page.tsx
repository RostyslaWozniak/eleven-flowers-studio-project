import { buttonVariants } from "@/components/ui/button";
import { Logo2 } from "@/components/ui/logo";
import { H1, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProductPurchaseFailurePage() {
  const t = useTranslations("payment.purchase_failure");
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-20 px-2.5 py-20 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-center text-center">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Logo2 />
              </div>
              <H1 className="text-4xl lg:text-6xl">{t("title")}</H1>
              <Text size="subtitle" variant="muted">
                {t("subtitle")}
              </Text>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                href="/products/new"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {t("button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
