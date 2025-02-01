"use client";
import { Home, Gift, Flower, Contact } from "lucide-react";

import { cn } from "@/lib/utils";
import { CartSheet } from "../cart/cart-sheet";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslations } from "next-intl";

export function MobileNavbar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("navigation");
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-[999] h-20 w-screen border-t border-gray-200 bg-white bg-opacity-70 backdrop-blur-sm md:hidden">
      <div className="mx-auto max-w-md px-4">
        <ul className="flex items-center justify-between">
          <NavItem
            href="/"
            icon={<Home className="h-6 w-6" />}
            label={t("home")}
            isActive={pathname === "/"}
          />
          <NavItem
            href="/collections/bouquets"
            icon={<Flower className="h-6 w-6" />}
            label={t("bouquets")}
            isActive={pathname === "/collections/bouquets"}
          />
          <NavItem
            href="/collections/gifts"
            icon={<Gift className="h-6 w-6" />}
            label={t("gifts")}
            isActive={pathname === "/products"}
          />

          <NavItem
            href={"/contact"}
            icon={<Contact className="h-6 w-6" />}
            label={t("contact")}
            isActive={pathname === "/orders"}
          />

          {!isDesktop && <CartSheet />}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  const router = useRouter();
  return (
    <li>
      <Link
        onTouchStart={() => router.push(href)}
        href={href}
        className={cn(
          "pointer-events-auto flex flex-col items-center p-2 text-gray-600 transition-colors duration-200",
          {
            "text-primary": isActive,
          },
        )}
      >
        <span
          className={cn(
            "inline-block transform rounded-full bg-gray-50 p-2 text-gray-800 transition-all duration-200 ease-in-out",
            {
              "text-primary": isActive,
            },
          )}
        >
          {icon}
        </span>
        <span className="mt-1 text-xs font-medium">{label}</span>
      </Link>
    </li>
  );
}
