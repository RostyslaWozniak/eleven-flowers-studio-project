import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { H1, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { GoogleStars } from "../google-stars";

export function HomeHeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="bg-gradient-to-b from-card to-transparent pb-4">
      <MaxWidthWrapper className="hidden items-center justify-between gap-16 md:flex lg:pt-12">
        <div className="flex flex-col items-start gap-8">
          <div className="space-y-4">
            <H1 className="text-nowrap lg:text-7xl">
              Eleven Flowers Studio <br></br>{" "}
              <span className="text-foreground/70">{t("title")}</span>
            </H1>
            <Text size="subtitle" variant="muted" className="md:text-2xl">
              {t("subtitle")}
            </Text>
          </div>
          <GoogleStars />
          <div className="flex items-center gap-8">
            <Link
              href="/products/new"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              {t("primary_button")}
            </Link>
            <Link
              href="/collections"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("secondary_button")}
            </Link>
          </div>
        </div>
        <div className="relative h-[600px] min-w-[500px] overflow-hidden rounded-sm">
          <Image
            priority
            width={500}
            height={600}
            className="z-10 h-auto min-w-[500px] rounded-sm bg-slate-100 object-cover"
            src="/images/hero.jpg"
            alt="Eleven Flowers Studio"
          />
        </div>
      </MaxWidthWrapper>
      <div className="relative md:hidden">
        <Image
          className="w-full"
          priority
          src="/images/hero-mobile.jpg"
          alt="Eleven Flowers Studio"
          width={550}
          height={650}
        />
        <div className="absolute -bottom-0 flex h-60 w-full items-end justify-center bg-gradient-to-b from-transparent via-background/30 to-background px-2.5">
          <Link
            href="/products/new"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("primary_button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
