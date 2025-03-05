import "@/styles/globals.css";

import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { env } from "@/env";
import { validateLang } from "@/lib/utils";
import { Toaster } from "sonner";
import { Manrope, Philosopher } from "next/font/google";
import type { WebSite, WithContext } from "schema-dts";
import CartProvider from "@/context/cart-context";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";
import { Providers } from "../providers";

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
  const paramsData = await params;

  const { locale } = paramsData;

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    metadataBase: env.NEXT_PUBLIC_SERVER_URL,
    title: {
      default: t("title"),
      template: "%s | Eleven Flowers Studio",
    },
    description: t("description"),
    icons: "/icon.ico",
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
  const paramsData = await params;

  const { locale } = paramsData;

  const lang = validateLang(locale);

  setRequestLocale(lang);

  const messages = await getMessages({ locale: lang });

  const t = await getTranslations({
    locale: lang,
    namespace: "home",
  });

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
      lang={locale}
      className={`${manrope.variable} ${philosopher.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers locale={lang} messages={messages}>
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
          <Suspense fallback={null}>
            <Toaster
              position="top-right"
              toastOptions={{
                classNames: {
                  error: "bg-destructive text-destructive-foreground",
                  success: "bg-emerald-500 text-white",
                  warning: "text-yellow-400",
                  info: "bg-blue-400 text-white",
                },
              }}
            />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
