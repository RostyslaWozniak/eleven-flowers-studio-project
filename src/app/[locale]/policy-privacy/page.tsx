import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { validateLang } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Markdown from "react-markdown";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const lang = validateLang(locale);

  setRequestLocale(lang);
  const t = await getTranslations({
    namespace: "",
    locale: lang,
  });
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="max-w-[1000px] py-16">
        <Markdown className="prose-lg font-manrope prose-h1:font-philosopher prose-h1:text-primary prose-h2:font-philosopher prose-h2:text-primary prose-li:list-disc">
          {t("policies", {
            date: "11.03.2025",
            business_name: "Eleven Flowers Studio",
            business_email: "elevenflowerstudio@gmail.com",
            business_address:
              "ul. Nocznickiego 25 lokal u12, 01-948 Warszawa, Polska",
          })}
        </Markdown>
      </MaxWidthWrapper>
    </section>
  );
}
