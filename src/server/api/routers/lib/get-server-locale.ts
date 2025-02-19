import { validateLang } from "@/lib/utils";
import { getLocale } from "next-intl/server";

export const getServerLocale = async () => {
  const locale = await getLocale();
  return validateLang(locale);
};
