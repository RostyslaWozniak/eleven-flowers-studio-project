import { H1 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export function Section() {
  const t = useTranslations("AboutPage");
  return (
    <div>
      <H1>{t("title")}</H1>
    </div>
  );
}
