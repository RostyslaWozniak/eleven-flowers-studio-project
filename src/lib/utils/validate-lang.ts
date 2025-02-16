import { type Locale, routing } from "@/i18n/routing";

export const validateLang = (locale: string): Locale => {
  if (routing.locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return routing.defaultLocale;
};
