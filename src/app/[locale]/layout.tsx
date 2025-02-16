import { Footer } from "@/components/footer";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CartProvider from "@/context/cart-context";
import { env } from "@/env";
import { validateLang } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";

const NavBar = dynamic(() =>
  import("@/components/nav-bar").then((mod) => mod.NavBar),
);
const MobileNavbar = dynamic(() =>
  import("@/components/nav-bar/mobile-nav-bar").then((mod) => mod.MobileNavbar),
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    metadataBase: env.NEXT_PUBLIC_SERVER_URL,
    title: {
      default: t("title"),
      template: "%s | Eleven Flowers Studio",
    },
    description: t("description"),
    alternates: {
      canonical: "./",
    },
    openGraph: {
      url: "./",
      type: "website",
    },
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  const lang = validateLang(locale);

  setRequestLocale(lang);

  const messages = await getMessages({ locale: lang });
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CartProvider>
        <Suspense fallback={null}>
          <NavBar locale={lang} />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <MobileNavbar />
        </Suspense>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
