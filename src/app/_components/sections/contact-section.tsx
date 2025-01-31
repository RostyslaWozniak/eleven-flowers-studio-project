import GoogleMap from "@/components/google-map";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";
import { Clock, MailOpen, MapPin, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function ContactSection({ className }: { className?: string }) {
  const t = useTranslations("HomePage.ContactSection");

  const contactData = [
    {
      id: 1,
      label: t("contactData.emailLabel"),
      value: "elevenflowerstudio@gmail.com",
      icon: MailOpen,
      href: "mailto:elevenflowerstudio@gmail.com",
      target: "_self",
    },
    {
      id: 2,
      label: t("contactData.phoneLabel"),
      value: "+48 571 944 969 ",
      icon: PhoneCall,
      href: "tel:+48571944969",
      target: "_self",
    },
    {
      id: 3,
      label: t("contactData.addressLabel"),
      value: "ul. Nocznickiego 25 lokal u12, 01-948 Warszawa",
      icon: MapPin,
      href: "https://www.google.com/maps/place/11+Flower+Studio/@52.2444049,20.9796979,17z/data=!4m5!3m4!1s0x471ecb0c5c9b3e6d:0x2a2d2c4e5b7c4e8!8m2!3d52.2444049!4d20.9825866",
      target: "_blank",
    },
    {
      id: 4,
      label: t("contactData.openingHours.label"),
      value: t("contactData.openingHours.value"),
      icon: Clock,
      href: null,
      target: null,
    },
  ];
  return (
    <section className={cn("w-full pt-12 lg:py-20", className)}>
      <MaxWidthWrapper className="px-0">
        <div className="flex flex-col items-center gap-y-8 md:gap-y-12">
          <div className="max-w-4xl space-y-4 px-2.5 md:space-y-6 md:px-0">
            <H2 className="text-start md:text-center">{t("title")}</H2>
            <Text size="subtitle" variant="muted" className="md:text-center">
              {t("subtitle")}
            </Text>
          </div>
          <div className="flex w-full flex-col-reverse gap-y-8 md:grid md:grid-cols-2">
            <div className="-z-10 w-full overflow-hidden md:rounded-sm">
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
    </section>
  );
}
