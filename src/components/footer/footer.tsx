import { MaxWidthWrapper } from "../max-width-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Logo2 } from "../ui/logo";
import { Text } from "../ui/typography";
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Instagram } from "../ui/icons";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  const tNav = useTranslations("navigation");
  return (
    <footer className="bg-card">
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 items-center gap-12 pb-10 pt-20 md:grid-cols-4 lg:grid-cols-5">
          <div className="hidden lg:block">
            <Logo2 />
          </div>
          <div className="col-span-2 h-full place-items-center md:grid">
            <div className="space-y-2">
              <Label>
                <Text size="lg" variant="muted" className="">
                  {t("form.label")}
                </Text>
              </Label>
              <form
                action=""
                className="flex w-full flex-col items-end gap-3 sm:flex-row"
              >
                <Input
                  type="text"
                  placeholder={t("form.placeholder")}
                  className="h-10 flex-grow placeholder:text-primary/70"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-10 w-full border bg-transparent text-base tracking-normal md:w-min"
                >
                  {t("form.button")}
                </Button>
              </form>
              <Text size="sm">{t("form.description")}</Text>
            </div>
          </div>
          <div>
            <Text> {t("links.title")}</Text>
            <ul className="mt-2">
              <li className="hover:text-primary hover:underline">
                <Link href="/">{tNav("home")}</Link>
              </li>
              <li className="hover:text-primary hover:underline">
                <Link href="/bouquets">{tNav("bouquets")}</Link>
              </li>
              <li className="hover:text-primary hover:underline">
                <Link href="/gifts">{tNav("gifts")}</Link>
              </li>
              <li className="hover:text-primary hover:underline">
                <Link href="/contact">{tNav("contact")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <Text> {t("socials.title")}</Text>
            <div className="mt-2 flex items-start gap-2 text-primary">
              <Facebook />
              <Instagram />
              <Twitter />
              <Linkedin />
            </div>
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
