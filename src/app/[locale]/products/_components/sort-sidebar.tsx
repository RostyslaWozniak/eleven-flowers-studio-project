"use client";
import IconMenu from "@/components/ui/icon-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coins, Gem, Gift, Star } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRouter } from "@/i18n/routing";

const sidebarItems = [
  {
    query: "new",
    label: "Nowe",
    icon: Gift,
  },
  {
    query: "popular",
    label: "Popularne",
    icon: Star,
  },
  {
    query: "price-desc",
    label: "Najdroższe",
    icon: Gem,
  },
  {
    query: "price-asc",
    label: "Najtańsze",
    icon: Coins,
  },
];

export const SortSidebar = () => {
  const [sort] = useQueryState("sort");

  const router = useRouter();

  return (
    <aside className="min-w-min py-4 md:py-20">
      <nav className="sticky top-0 space-y-8 md:top-20 md:pr-4">
        <div>
          <h2 className="mb-2 px-2.5 text-xs uppercase">sortowanie</h2>
          <ul className="scrollbar-hide flex w-screen items-start gap-x-2 gap-y-1 overflow-x-scroll px-2.5 sm:w-min sm:overflow-x-visible md:flex-col">
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
