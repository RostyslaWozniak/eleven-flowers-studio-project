import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { GoogleStars } from "@/components/ui/icons";
import { GoogleLogo } from "@/components/ui/icons/google-logo";
import { H1, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function HomeHeroSection() {
  const t = useTranslations("HomePage.HeroSection");
  return (
    <section className="bg-gradient-to-b from-card to-transparent pb-4">
      <MaxWidthWrapper className="hidden items-center justify-between gap-8 md:flex lg:pt-12">
        <div className="flex flex-col items-start gap-8">
          <div className="space-y-4">
            <H1 className="text-nowrap">
              Eleven Flowers Studio <br></br>{" "}
              <span className="text-foreground/70">{t("heroTitle")}</span>
            </H1>
            <Text size="subtitle" variant="muted" className="md:text-2xl">
              {t("heroSubtitle")}
            </Text>
          </div>
          <div className="flex items-center gap-3">
            <GoogleStars className="opacity-8=90 hidden lg:flex" />
            <Text size="lg" className="font-bold">
              5 Stars on
            </Text>
            <GoogleLogo />
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/collections/bouquets"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              {t("primaryActionButton")}
            </Link>
            <Button variant="outline">{t("secondaryActionButton")}</Button>
          </div>
        </div>

        <Image
          priority
          className="rounded-sm opacity-90"
          src="/images/hero.png"
          alt="Eleven Flowers Studio"
          width={500}
          height={500}
        />
      </MaxWidthWrapper>
      <div className="relative md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Eleven Flowers Studio"
          width={550}
          height={650}
        />
        <div className="absolute -bottom-0 flex h-60 w-full items-end justify-center bg-gradient-to-b from-transparent via-background/30 to-background px-2.5">
          <Button variant="outline"> {t("primaryActionButton")}</Button>
        </div>
      </div>
    </section>
  );
}
