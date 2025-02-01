"use client";

import { NavItem } from "./nav-item";
import { Logo1 } from "../ui/logo";
import { LangSelect } from "./lang-select";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { CartSheet } from "../cart/cart-sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

export function NavBar() {
  const t = useTranslations("navigation");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <header className="inset-x-0 top-0 z-50 w-screen bg-background/70 shadow-md shadow-foreground/20 backdrop-blur-sm md:sticky">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex h-16 items-center justify-between px-2">
          <Link href="/">
            <Logo1 className="z-50 h-10 w-32 md:h-12" />
          </Link>

          <nav className="itens-center hidden w-full md:flex">
            <div className="flex h-full flex-grow justify-center">
              <ul className="flex h-16">
                <li>
                  <NavItem name={t("home")} href="/" />
                </li>
                <li>
                  <NavItem name={t("bouquets")} href="/collections/bouquets" />
                </li>
                <li>
                  <NavItem name={t("gifts")} href="/collections/gifts" />
                </li>
                <li>
                  <NavItem name={t("contact")} href="/contact" />
                </li>
              </ul>
            </div>
          </nav>
          <div className="flex items-center gap-3">
            {isDesktop && <CartSheet />}
            <LangSelect />
          </div>
        </div>
      </div>
    </header>
  );
}
