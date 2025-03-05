import { MaxWidthWrapper } from "../max-width-wrapper";
import { Logo2 } from "../ui/logo";
import { Text } from "../ui/typography";
import Link from "next/link";
import { Instagram } from "../ui/icons";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { SubscribeForm } from "./subscribe-form";

export function Footer() {
  const t = useTranslations("footer");

  const tNav = useTranslations("navigation");
  return (
    <footer className="bg-card">
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 items-center gap-12 pb-10 pt-20 md:grid-cols-4 lg:grid-cols-5">
          <div className="hidden lg:block">
            <Logo2 />
          </div>
          <div className="col-span-2 h-full place-items-center md:grid">
            <SubscribeForm />
          </div>
          <div>
            <Text> {t("links")}</Text>
            <ul className="mt-2">
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
            <Text> {t("socials")}</Text>
            <ul className="mt-2 flex items-start gap-2 text-primary">
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
