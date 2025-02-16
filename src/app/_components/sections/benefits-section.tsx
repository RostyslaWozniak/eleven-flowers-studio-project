import { Instagram } from "@/components/ui/icons";
import { Text } from "@/components/ui/typography";
import {
  BadgePercent,
  Gift,
  Handshake,
  Plane,
  ShoppingBag,
  Sprout,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function BenefitsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.benefits" });
  const benefits = [
    {
      title: t("0.title"),
      description: t("0.description"),
      icon: ShoppingBag,
    },
    {
      title: t("1.title"),
      description: t("1.description"),
      icon: BadgePercent,
    },
    {
      title: t("2.title"),
      description: t("2.description"),
      icon: Gift,
    },
    {
      title: t("3.title"),
      description: t("3.description"),
      icon: Handshake,
    },
    {
      title: t("4.title"),
      description: t("4.description"),
      icon: Sprout,
    },
    {
      title: t("5.title"),
      description: t("5.description"),
      icon: Plane,
    },
    {
      title: t("6.title"),
      description: t("6.description"),
      icon: Instagram,
    },
  ];

  return (
    <section className="">
      <div className="flex flex-wrap items-start justify-center gap-3 py-4 md:gap-16">
        {benefits.slice(0, 3).map(({ title, description, icon: Icon }, i) => (
          <div
            key={i}
            className="flex max-w-sm flex-col items-center gap-2 text-center md:gap-4"
          >
            <div className="h-14 w-14 rounded-full bg-primary p-2.5 md:h-16 md:w-16">
              <Icon className="h-full w-full stroke-[1.5] text-background" />
            </div>
            <div>
              <Text size="subtitle" className="font-bold text-primary">
                {title}
              </Text>
              <Text variant="muted">{description}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden items-start justify-center gap-4 py-4 md:flex">
        {benefits.slice(3, 7).map(({ title, description, icon: Icon }, i) => (
          <div
            key={i}
            className="flex max-w-sm flex-col items-center gap-2 text-center md:gap-4"
          >
            <div className="h-14 w-14 rounded-full bg-primary p-2.5 md:h-16 md:w-16">
              <Icon className="h-full w-full stroke-[1.5] text-background" />
            </div>
            <div>
              <Text size="subtitle" className="font-bold text-primary">
                {title}
              </Text>
              <Text variant="muted">{description}</Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
