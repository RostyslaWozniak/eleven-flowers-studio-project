import { ContactSection } from "@/app/_components/sections";
import { type Locale, routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  let lang: Locale = routing.defaultLocale;
  const { locale } = await params;

  if (routing.locales.includes(locale as Locale)) {
    lang = locale as Locale;
  }

  return (
    <>
      <ContactSection locale={lang} />
    </>
  );
}
