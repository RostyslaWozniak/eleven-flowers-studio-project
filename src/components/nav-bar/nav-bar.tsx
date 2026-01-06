import { NavItem } from "./nav-item";
import { Logo1 } from "../ui/logo";
import { getTranslations } from "next-intl/server";
import RightNavPanel from "./right-nav-panel";
import { Link, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const navigation = [
  { id: 1, href: "/", label: "home" },
  { id: 2, href: "/collections/bouquets", label: "bouquets" },
  { id: 3, href: "/collections/gifts", label: "gifts" },
  { id: 4, href: "/contact", label: "contact" },
];

export async function NavBar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ namespace: "navigation", locale: locale });

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 w-screen bg-background/70 shadow-md shadow-foreground/20 backdrop-blur-sm md:sticky",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex h-14 items-center justify-between px-2">
          <Link
            href="/"
            locale={locale}
            aria-label="Logo Eleven Flowers Studio"
          >
            <Logo1 className="z-50 h-10 w-32 md:h-12" />
          </Link>

          <nav className="itens-center hidden w-full md:flex">
            <div className="flex h-full flex-grow justify-center">
              <ul className="flex h-14">
                {navigation.map(({ id, href, label }) => (
                  <li key={id}>
                    <NavItem href={href}>
                      <Link
                        href={href}
                        locale={locale}
                        className="flex h-full items-center px-6 py-4"
                      >
                        {t(label)}
                      </Link>
                    </NavItem>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <RightNavPanel />
        </div>
      </div>
    </header>
  );
}
