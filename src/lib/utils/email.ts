import {type Locale } from "@/i18n/routing";

export function getEmailTitleByLang(locale: Locale) {
  switch (locale) {
    case "pl":
      return "Dziękujemy za zakup!";
    case "ru":
      return "Спасибо за покупку!";
    case "en":
      return "Thank you for your purchase!";
    default:
      return "Thank you for your purchase!";
  }
}