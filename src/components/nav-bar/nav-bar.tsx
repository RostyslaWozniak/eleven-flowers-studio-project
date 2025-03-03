import { NavItem } from "./nav-item";
import { Logo1 } from "../ui/logo";
import { getTranslations } from "next-intl/server";
import RightNavPanel from "./right-nav-panel";
import { Link, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  EnvironmentBanner,
  IS_LOCAL_PROJECT,
  IS_TEST_PROJECT,
} from "../environment-babner";

export async function NavBar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ namespace: "navigation", locale: locale });

  return (
    <>
      <EnvironmentBanner />
      <header
        className={cn(
          "inset-x-0 top-0 z-50 w-screen bg-background/70 shadow-md shadow-foreground/20 backdrop-blur-sm md:sticky",
          {
            "top-10": IS_LOCAL_PROJECT ?? IS_TEST_PROJECT,
          },
        )}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex h-16 items-center justify-between px-2">
            <Link
              href="/"
              locale={locale}
              aria-label="Logo Eleven Flowers Studio"
            >
              <Logo1 className="z-50 h-10 w-32 md:h-12" />
            </Link>

            <nav className="itens-center hidden w-full md:flex">
              <div className="flex h-full flex-grow justify-center">
                <ul className="flex h-16">
                  <li>
                    <NavItem href="/">
                      <Link
                        href="/"
                        locale={locale}
                        className="flex h-full items-center px-4"
                      >
                        {t("home")}
                      </Link>
                    </NavItem>
                  </li>
                  <li>
                    <NavItem href="/collections/bouquets">
                      <Link
                        href="/collections/bouquets"
                        locale={locale}
                        className="flex h-full items-center px-4"
                      >
                        {t("bouquets")}
                      </Link>
                    </NavItem>
                  </li>
                  <li>
                    <NavItem href="/collections/gifts">
                      <Link
                        href="/collections/gifts"
                        locale={locale}
                        className="flex h-full items-center px-4"
                      >
                        {t("gifts")}
                      </Link>
                    </NavItem>
                  </li>
                  <li>
                    <NavItem href="/contact">
                      <Link
                        href="/contact"
                        locale={locale}
                        className="flex h-full items-center px-4"
                      >
                        {t("contact")}
                      </Link>
                    </NavItem>
                  </li>
                </ul>
              </div>
            </nav>
            <RightNavPanel />
          </div>
        </div>
      </header>
    </>
  );
}
