"use client";

import { routing } from "@/i18n/routing";
import { useRouter, usePathname } from "next/navigation";
import { DialogWrapper } from "../dialog-wrapper";
import { useState, useTransition } from "react";
import { CheckCircleIcon, GlobeIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import LoadingButton from "../loading-button";
import { Button } from "../ui/button";

const languages = {
  en: "English",
  pl: "Polski",
  ru: "Русский",
};

export function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [pendingLocale, setPendingLocale] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const currentLang = useLocale();
  const t = useTranslations("navigation");

  const changeLanguage = (locale: string) => {
    setPendingLocale(locale);
    startTransition(() => {
      router.push(`/${locale}${pathname.replace(/^\/(en|pl|ru)/, "")}`);
      setPendingLocale(null);
    });
  };
  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative cursor-pointer"
        aria-label="switch language"
      >
        <GlobeIcon className="size-4.5" />
        <span className="absolute -bottom-1.5 -right-1.5 text-xs">
          {currentLang}
        </span>
      </Button>
      <DialogWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={t("lang_select")}
        className="w-80"
      >
        <div className="flex flex-col gap-2">
          {routing.locales.map((lang) => {
            const isCurrentLang = currentLang === lang;
            return (
              <LoadingButton
                loading={isPending && pendingLocale === lang}
                key={lang}
                onClick={() =>
                  isCurrentLang ? setIsOpen(false) : changeLanguage(lang)
                }
                disabled={isPending}
                variant={isCurrentLang ? "default" : "outline"}
                className={cn(
                  "shadow-none hover:shadow-none disabled:cursor-not-allowed disabled:opacity-100",
                )}
              >
                {isCurrentLang && <CheckCircleIcon />}
                {languages[lang]}
              </LoadingButton>
            );
          })}
        </div>
      </DialogWrapper>
    </>
  );
}
