import { type Locale } from "@/i18n/routing";
import { type NextRequest } from "next/server";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
export const CART_COOKIE_NAME = "CART_ID";
export const ORDER_COOKIE_NAME = "ORDER_ID";

export function getCookieValue(req: NextRequest, name: string): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  const cartId = cookie
    ?.split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];
  if (!cartId) return null;
  return cartId;
}

export function setCookieValue(
  headers: Headers,
  name: string,
  value: string,
): void {
  headers.append(
    "Set-Cookie",
    `${name}=${value};  HttpOnly; Secure; SameSite=Strict;`,
  );
}

export function deleteCookieValue(headers: Headers, name: string): void {
  headers.append(
    "Set-Cookie",
    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict;`,
  );
}

export function getLocaleFromCookie(req: NextRequest): Locale {
  const locale = getCookieValue(req, LOCALE_COOKIE_NAME);
  if (locale !== "en" && locale !== "pl" && locale !== "ru") return "en";
  return locale;
}
