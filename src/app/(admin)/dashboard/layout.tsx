import "@/styles/globals.css";

import { type Metadata } from "next";
import { Sidebar } from "../_components/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/react";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Manrope, Philosopher } from "next/font/google";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${philosopher.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        <TRPCReactProvider>
          <NuqsAdapter>
            <div className="container relative mx-auto flex min-h-[calc(100vh-240px)] max-w-7xl grow justify-between">
              <Sidebar />
              <div className="relative grow px-10 py-5">{children}</div>
            </div>
            <Suspense fallback={null}>
              <Toaster />
            </Suspense>
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
