import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import { Section } from "./secton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <Section />;
}
