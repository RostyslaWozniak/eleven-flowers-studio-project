"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Cookie, PlayCircleIcon } from "lucide-react";
import { useCookieConsent } from "../hooks/use-cookie-consent";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const { isLoading, acceptAll, hasConsented } = useCookieConsent();

  const t = useTranslations("cookies");

  // Don't render if still loading or user has already consented
  if (isLoading || hasConsented) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex w-full items-end justify-center bg-black/40 p-2 backdrop-blur-sm sm:items-center">
      <Card className="mx-auto mb-20 w-full max-w-2xl gap-y-4 border-0 sm:mb-0 md:rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            <CardTitle className="text-lg">{t("title")}</CardTitle>
          </div>
          <CardDescription className="text-sm">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardFooter className="relative flex flex-col justify-end pb-0 sm:flex-row sm:pb-6">
          <Button
            size="md"
            onClick={acceptAll}
            className="w-full text-white sm:w-auto"
          >
            {t("button")}
          </Button>
          <div className="bottom-0 left-0 sm:absolute">
            <PoweredBySection />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function PoweredBySection() {
  return (
    <div className="px-6 py-4 sm:pb-5 sm:pt-0">
      <div className="flex justify-center gap-2 text-xs sm:justify-end">
        Powered by{" "}
        <Link
          href="https://www.webjoin.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex text-xs text-cyan-700 transition-colors hover:text-cyan-500 hover:underline"
        >
          <PlayCircleIcon size={16} className="mr-1" />
          WebJoin
        </Link>
      </div>
    </div>
  );
}
