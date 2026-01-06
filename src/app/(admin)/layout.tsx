import "@/styles/globals.css";

import { type Metadata } from "next";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";
import { Manrope, Philosopher } from "next/font/google";
import { Providers } from "../providers";
import { validateLang } from "@/lib/utils";
import { getMessages, setRequestLocale } from "next-intl/server";
import { EnvironmentBanner } from "@/components/environment-banner";
import { getCurrentUser } from "@/auth/current-user";
import { redirect } from "next/navigation";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { LogOutIcon, XIcon } from "lucide-react";
import { LogOutButton } from "@/auth/components/log-out-button";
export const metadata: Metadata = {
  title: {
    template: "Admin | %s | Eleven Flowers Studio",
    default: "Admin | Eleven Flowers Studio",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/icon.ico" }],
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
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

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
      <body className="flex min-h-screen w-screen flex-col overflow-x-hidden font-manrope">
        <EnvironmentBanner />
        <Providers locale="en" messages={messages}>
          <div className="relative mx-auto flex min-h-[calc(100vh-240px)] w-full max-w-[1400px] grow justify-between">
            <Sidebar />
            <div className="relative grow px-10 py-12">{children}</div>
          </div>

          <Toaster
            toastOptions={{
              classNames: {
                error: "bg-destructive text-destructive-foreground",
                success: "bg-emerald-500 text-white",
                warning: "text-yellow-400",
                info: "bg-blue-400",
              },
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-center xl:hidden">
            <MaxWidthWrapper className="max-w-md">
              <div className="flex flex-col items-center rounded-lg border border-dashed border-muted-foreground/50 bg-muted p-6">
                <div className="mb-6 rounded-sm bg-destructive/60 p-2 text-destructive-foreground">
                  <XIcon />
                </div>
                <div className="mb-6">
                  <h1 className="text-bold mb-2 text-lg">
                    Device not supported
                  </h1>
                  <p className="text-muted-foreground">
                    {
                      "This app doesn't work on phones or tablets. To continue, please use a computer or laptop."
                    }
                  </p>
                </div>
                <LogOutButton className="mt-4 w-full">
                  <LogOutIcon />
                  Logout
                </LogOutButton>
              </div>
            </MaxWidthWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
