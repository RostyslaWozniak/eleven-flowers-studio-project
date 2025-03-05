import { ContactSection } from "@/app/_components/sections";
import { validateLang } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = validateLang(locale);

  setRequestLocale(lang);

  return (
    <>
      <div className="bg-gradient-to-b from-card to-transparent pb-4">
        <ContactSection />
      </div>
    </>
  );
}
