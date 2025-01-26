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

const benefitsData = [
  {
    title: "Darmowa wysyłka",
    description:
      "Skorzystaj z darmowej dostawy przy zamówieniach powyżej 350 zł.",
    icon: ShoppingBag,
  },
  {
    title: "Zniżki do 30%",
    description: "Zniżki dla stałych klientów oraz na zakupy powyżej 350 zł.",
    icon: BadgePercent,
  },
  {
    title: "Prezenty",
    description: "Eleganckie wazony i inne prezenty pasujące do kwiatów",
    icon: Gift,
  },
  {
    title: "Indywidualne podejście",
    description:
      "Tworzymy kompozycje spełniające Państwa życzenia i oczekiwania.",
    icon: Handshake,
  },
  {
    title: "Gwarancja świeżości",
    description: "Tylko najświeższe kwiaty od sprawdzonych dostawców.",
    icon: Sprout,
  },
  {
    title: "Szybka dostawa",
    description:
      "Kwiaty dostarczamy terminowo, aby radość przyszła w odpowiednim momencie.",
    icon: Plane,
  },
  {
    title: "Szybka dostawa",
    description:
      "Kwiaty dostarczamy terminowo, aby radość przyszła w odpowiednim momencie.",
    icon: Instagram,
  },
];

export function BenefitsSection() {
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
