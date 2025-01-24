import GoogleMap from "@/components/google-map";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H2, Text } from "@/components/ui/typography";
import { Clock, MailOpen, MapPin, PhoneCall } from "lucide-react";

const contactData = [
  {
    id: 1,
    label: "Email",
    value: "elevenflowerstudio@gmail.com",
    icon: MailOpen,
  },
  { id: 2, label: "Phone", value: "+48 571 944 969 ", icon: PhoneCall },
  {
    id: 3,
    label: "Adres",
    value: "ul. Nocznickiego 25 lokal u12, 01-948 Warszawa",
    icon: MapPin,
  },
  {
    id: 4,
    label: "Godziny otwarcia",
    value: "Pn-Sb: 10:00-19:00 Nd: 12:00-18:00",
    icon: Clock,
  },
];

export function ContactSection() {
  return (
    <section>
      <MaxWidthWrapper className="px-0">
        <div className="flex flex-col items-center gap-y-8 pt-16 md:gap-y-20 md:py-16">
          <div className="max-w-4xl space-y-4 px-2.5 md:space-y-6 md:px-0">
            <H2 className="text-start md:text-center">Skontaktuj się z nami</H2>
            <Text size="subtitle" className="md:text-center">
              Masz pytania? Chcesz złożyć zamówienie? Jesteśmy tutaj, aby Ci
              pomóc! Skontaktuj się z nami przez:
            </Text>
          </div>
          <div className="flex w-full flex-col-reverse gap-y-8 md:grid md:grid-cols-2">
            <div className="w-full overflow-hidden md:rounded-sm">
              <GoogleMap />
            </div>
            <div className="space-y-10 px-2.5 md:self-center md:px-0 md:pl-20">
              {contactData.map(({ id, label, value, icon: Icon }) => (
                <div key={id} className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-full bg-primary p-2.5 md:h-16 md:w-16">
                    <Icon className="h-full w-full stroke-[1.5] text-background" />
                  </div>
                  <div className="">
                    <Text size="lg" className="font-bold text-primary">
                      {label}
                    </Text>
                    <Text>{value}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
