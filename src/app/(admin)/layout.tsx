import "@/styles/globals.css";

import { type Metadata } from "next";
import { Sidebar } from "./_components/sidebar";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Manrope, Philosopher } from "next/font/google";
import { Providers } from "../providers";
import { validateLang } from "@/lib/utils";
import { getMessages, setRequestLocale } from "next-intl/server";
export const metadata: Metadata = {
  title: {
    template: "Admin | %s | Eleven Flowers Studio",
    default: "Admin | Eleven Flowers Studio",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const paramsData = await params;

  const { locale } = paramsData;

  const lang = validateLang(locale);

  setRequestLocale(lang);

  const messages = await getMessages({ locale: lang });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${philosopher.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        <Providers locale="en" messages={messages}>
          <div className="relative mx-auto flex min-h-[calc(100vh-240px)] w-full max-w-[1400px] grow justify-between">
            <Sidebar />
            <div className="relative grow px-10 py-5">{children}</div>
          </div>
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
