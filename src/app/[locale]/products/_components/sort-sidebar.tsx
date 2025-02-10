"use client";
import IconMenu from "@/components/ui/icon-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coins, Gem, Gift, Star } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRouter } from "@/i18n/routing";
import { H2 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export const SortSidebar = () => {
  const [sort] = useQueryState("sort", {
    defaultValue: "new",
  });

  const t = useTranslations("product.sidebar");

  const router = useRouter();

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
      <nav className="sticky top-0 space-y-8 md:top-20 md:pr-4">
        <div>
          <H2 className="mb-2 px-2.5 text-start text-base uppercase md:text-start md:text-base lg:text-base">
            sortowanie
          </H2>
          <ul className="scrollbar-hide flex w-screen items-start gap-x-2 gap-y-1 overflow-x-scroll px-2.5 py-1 sm:w-min sm:overflow-visible md:flex-col">
            {sidebarItems.map(({ query, label, icon: Icon }) => (
              <li key={query}>
                <Button
                  onClick={async () => router.push(`/products?sort=${query}`)}
                  variant={sort === query ? "outline" : "secondary"}
                  size="lg"
                  className={cn(
                    "px-4 md:bg-transparent md:px-6 md:shadow-none",
                    {
                      "md:border-transparent": sort !== query,
                    },
                  )}
                >
                  <IconMenu
                    icon={Icon}
                    text={label}
                    className="text-base"
                    iconSize={24}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
