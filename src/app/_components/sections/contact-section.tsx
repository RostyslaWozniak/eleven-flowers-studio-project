import GoogleMap from "@/components/google-map";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";
import { Clock, MailOpen, MapPin, PhoneCall } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/section-wrapper";

export function ContactSection({ className }: { className?: string }) {
  const t = useTranslations("home.contact");
  const contactData = [
    {
      id: 1,
      label: t("details.email"),
      value: "elevenflowerstudio@gmail.com",
      icon: MailOpen,
      href: "mailto:elevenflowerstudio@gmail.com",
      target: "_self",
    },
    {
      id: 2,
      label: t("details.phone"),
      value: "+48 571 944 969 ",
      icon: PhoneCall,
      href: "tel:+48571944969",
      target: "_self",
    },
    {
      id: 3,
      label: t("details.address"),
      value: "ul. Nocznickiego 25 lokal u12, 01-948 Warszawa",
      icon: MapPin,
      href: "https://www.google.com/maps/place/Eleven+Flowers+Studio/@52.286502,20.927094,16z/data=!4m6!3m5!1s0x471ecb002f5e760f:0xc77633ae366395b3!8m2!3d52.2865016!4d20.9270936!16s%2Fg%2F11y9cxyws_?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
      target: "_blank",
    },
    {
      id: 4,
      label: t("details.opening_hours.label"),
      value: t("details.opening_hours.value"),
      icon: Clock,
      href: null,
      target: null,
    },
  ];
  return (
    <SectionWrapper className={cn("w-full pb-0", className)}>
      <MaxWidthWrapper className="px-0">
        <div className="flex flex-col items-center gap-y-8 md:gap-y-12">
          <div className="max-w-4xl space-y-4 px-2.5 md:space-y-6 md:px-0">
            <H2 className="text-start md:text-center">{t("title")}</H2>
            <Text size="subtitle" variant="muted" className="md:text-center">
              {t("subtitle")}
            </Text>
          </div>
          <div className="flex w-full flex-col-reverse gap-y-8 md:grid md:grid-cols-2">
            <div className="z-10 w-full overflow-hidden md:rounded-sm">
              <GoogleMap />
            </div>
            <div className="space-y-10 px-2.5 md:self-center md:px-0 md:pl-20">
              {contactData.map(
                ({ id, label, value, icon: Icon, href, target }) => (
                  <Fragment key={id}>
                    {href ? (
                      <Link
                        target={target}
                        href={href}
                        className="flex items-center gap-5"
                      >
                        <div className="h-14 w-14 rounded-full bg-primary p-3 md:h-16 md:w-16">
                          <Icon className="h-full w-full stroke-[1.5] text-background" />
                        </div>
                        <div>
                          <Text size="lg" className="font-bold text-primary">
                            {label}
                          </Text>
                          <Text>{value}</Text>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-full bg-primary p-3 md:h-16 md:w-16">
                          <Icon className="h-full w-full stroke-[1.5] text-background" />
                        </div>
                        <div className="">
                          <Text size="lg" className="font-bold text-primary">
                            {label}
                          </Text>
                          <Text>{value}</Text>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ),
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
