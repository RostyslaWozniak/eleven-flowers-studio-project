"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H3 } from "./ui/typography";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("cookies");

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-4xl rounded-lg border-border bg-card p-6 shadow-lg">
        <div className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xl">
              <Cookie className="min-h-4 min-w-4" /> <H3>{t("title")}</H3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={accept}
              aria-label="Close"
            >
              <X className="min-h-4 min-w-4" />
            </Button>
          </div>
          <div className="max-w-2xl pt-3">{t("description")}</div>
        </div>

        <div className="flex justify-end gap-2 pt-0 sm:flex-row">
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={accept}
          >
            {t("button")}
          </Button>
        </div>
      </div>
    </div>
  );
}
