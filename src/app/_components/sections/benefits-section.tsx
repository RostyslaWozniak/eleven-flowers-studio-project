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
import { useTranslations } from "next-intl";

export function BenefitsSection() {
  const t = useTranslations("HomePage.BenefitsSection");

  const benefitsData = [
    {
      title: t("freeShipping.title"),
      description: t("freeShipping.description"),
      icon: ShoppingBag,
    },
    {
      title: t("discounts.title"),
      description: t("discounts.description"),
      icon: BadgePercent,
    },
    {
      title: t("gifts.title"),
      description: t("gifts.description"),
      icon: Gift,
    },
    {
      title: t("personalizedService.title"),
      description: t("personalizedService.description"),
      icon: Handshake,
    },
    {
      title: t("freshnessGuarantee.title"),
      description: t("freshnessGuarantee.description"),
      icon: Sprout,
    },
    {
      title: t("fastDelivery.title"),
      description: t("fastDelivery.description"),
      icon: Plane,
    },
    {
      title: t("projectPhotos.title"),
      description: t("projectPhotos.description"),
      icon: Instagram,
    },
  ];

  return (
    <section className="">
      <div className="flex flex-wrap items-start justify-center gap-3 py-4 md:gap-16">
        {benefitsData
          .slice(0, 3)
          .map(({ title, description, icon: Icon }, i) => (
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
        {benefitsData
          .slice(3, 7)
          .map(({ title, description, icon: Icon }, i) => (
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
