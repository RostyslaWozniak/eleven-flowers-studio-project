import "@/styles/globals.css";

import { Philosopher, Manrope } from "next/font/google";

import type { WebSite, WithContext } from "schema-dts";

import { TRPCReactProvider } from "@/trpc/react";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { env } from "@/env";

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
  setRequestLocale(locale);

  const messages = await getMessages();

  const t = await getTranslations({
    locale: locale,
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
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <NuqsAdapter>
              {children}{" "}
              <Suspense fallback={null}>
                <Toaster />
              </Suspense>
            </NuqsAdapter>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
