import "@/styles/globals.css";

import { Philosopher, Manrope } from "next/font/google";

import type { WebSite, WithContext } from "schema-dts";

import { TRPCReactProvider } from "@/trpc/react";
import { Footer } from "@/components/footer";

import { NextIntlClientProvider } from "next-intl";
import {
  getLocale,
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CartProvider from "@/context/cart-context";

const NavBar = dynamic(() =>
  import("@/components/nav-bar").then((mod) => mod.NavBar),
);
const MobileNavbar = dynamic(() =>
  import("@/components/nav-bar/mobile-nav-bar").then((mod) => mod.MobileNavbar),
);

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

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
    title: {
      default: t("title"),
      template: "%s | Eleven Flowers Studio",
    },
    description: t("description"),
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
  const localeFromNext = await getLocale();
  setRequestLocale(localeFromNext);

  const messages = await getMessages();

  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "home" });

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "./",
    name: t("title"),
    image: "./opengraph-image.png",
    description: t("description"),
  };

  return (
    <html
      lang={localeFromNext}
      className={`${manrope.variable} ${philosopher.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <NuqsAdapter>
              <CartProvider>
                <Suspense fallback={null}>
                  <NavBar />
                </Suspense>
                <main className="flex-grow">{children}</main>
                <Footer />
                <Suspense fallback={null}>
                  <Toaster />
                </Suspense>
                <Suspense fallback={null}>
                  <MobileNavbar />
                </Suspense>
              </CartProvider>
            </NuqsAdapter>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
