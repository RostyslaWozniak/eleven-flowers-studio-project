"use client";
import IconMenu from "@/components/ui/icon-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coins, Gem, Gift, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { H2 } from "@/components/ui/typography";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const SortSidebar = () => {
  const locale = useLocale();

  const params = useParams();

  const t = useTranslations("product.sidebar");
  const sidebarItems = [
    {
      query: "new",
      label: t("sort.new"),
      icon: Gift,
    },
    {
      query: "popular",
      label: t("sort.popular"),
      icon: Star,
    },
    {
      query: "price-desc",
      label: t("sort.price_desc"),
      icon: Gem,
    },
    {
      query: "price-asc",
      label: t("sort.price_asc"),
      icon: Coins,
    },
  ];

  return (
    <aside className="min-w-min py-4 md:py-20">
      <nav className="sticky space-y-8 md:top-20 md:pr-4">
        <div>
          <H2 className="mb-2 px-2.5 text-start text-base uppercase md:text-start md:text-base lg:text-base">
            {t("sort.label")}
          </H2>
          <ul className="scrollbar-hide flex w-screen items-start gap-x-2 gap-y-1 overflow-x-scroll px-2.5 py-1 sm:w-min sm:overflow-visible md:flex-col">
            {sidebarItems.map(({ query, label, icon: Icon }) => (
              <li key={query}>
                <Link
                  locale={locale}
                  href={`/products/${query}`}
                  className={cn(
                    buttonVariants({
                      variant: params.sort === query ? "outline" : "secondary",
                      size: "lg",
                    }),
                    "px-4 md:bg-transparent md:px-6 md:shadow-none",
                    {
                      "md:border-transparent": params.sort !== query,
                    },
                  )}
                >
                  <IconMenu
                    icon={Icon}
                    text={label}
                    className="text-base"
                    iconSize={24}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
