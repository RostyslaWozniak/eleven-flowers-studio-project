import "@/styles/globals.css";

import { Philosopher, Manrope } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { NavBar } from "@/components/nav-bar";
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
import CartProvider from "@/components/product/context/cart-context";
import { MobileNavbar } from "@/components/nav-bar/mobile-nav-bar";
import { Toaster } from "sonner";

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
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const localeFromNext = await getLocale();
  setRequestLocale(localeFromNext);

  const messages = await getMessages();

  return (
    <html
      lang={localeFromNext}
      className={`${manrope.variable} ${philosopher.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <NuqsAdapter>
              <CartProvider>
                <NavBar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster />
                <MobileNavbar />
              </CartProvider>
            </NuqsAdapter>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
