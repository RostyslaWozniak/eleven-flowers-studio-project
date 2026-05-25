import { MaxWidthWrapper } from "../max-width-wrapper";
import { Logo2 } from "../ui/logo";
import { Text } from "../ui/typography";
import { Instagram } from "../ui/icons";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { SubscribeForm } from "./subscribe-form";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");

  const tNav = useTranslations("navigation");
  return (
    <footer className="relative bg-card">
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 gap-12 pb-10 pt-20 md:grid-cols-4 lg:grid-cols-5">
          <div className="hidden w-40 lg:block">
            <Logo2 />
          </div>
          <div className="col-span-2 h-full pr-12 md:grid">
            <SubscribeForm />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-bold text-primary/80">
              {t("links")}
            </h4>
            <ul>
              <li>
                <Link href="/" className="hover:text-primary hover:underline">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bouquets"
                  className="hover:text-primary hover:underline"
                >
                  {tNav("bouquets")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gifts"
                  className="hover:text-primary hover:underline"
                >
                  {tNav("gifts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary hover:underline"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-lg font-bold text-primary/80">
              {t("socials")}
            </h4>
            <ul className="flex items-start gap-2 text-primary">
              <li>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/eleven_flowers.pl/"
                  className="hover:text-primary hover:underline"
                >
                  <Instagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px]">
          <Separator />
        </div>
        <div className="flex flex-col-reverse items-center justify-between py-2 text-center md:flex-row md:py-4">
          <Text size="sm">
            © {new Date().getFullYear()} Eleven Flower Studio. {t("rights")}
          </Text>
          <Link
            href="/policy-privacy"
            className="mb-2 text-sm hover:text-primary hover:underline md:mb-0"
          >
            {t("policy")}
          </Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
