import { enGB } from "date-fns/locale/en-GB";
import { pl } from "date-fns/locale/pl";
import { ru } from "date-fns/locale/ru";

export function getCalendarLocale(locale: string) {
  return locale === "pl" ? pl : locale === "en" ? enGB : ru;
}
