import { navigation } from "@/lib/navigation";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Logo2 } from "../ui/logo";
import { Text } from "../ui/typography";
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Instagram } from "../ui/icons";

export function Footer() {
  return (
    <footer className="bg-card">
      <MaxWidthWrapper border>
        <div className="grid grid-cols-2 gap-12 pb-10 pt-20 md:grid-cols-5">
          <div className="hidden md:block">
            <Logo2 />
          </div>
          <div className="col-span-2 hidden h-full place-items-center md:grid">
            <Label>
              <Text>Zapisz się, aby otrzymywać oferty specjalne.</Text>
            </Label>
            <form action="" className="flex w-full items-end gap-3">
              <Input
                type="text"
                placeholder="Twój email"
                className="h-10 flex-grow"
              />
              <Button
                size="sm"
                variant="outline"
                className="h-10 w-min border bg-transparent text-base font-bold tracking-normal"
              >
                Wyślij
              </Button>
            </form>
            <Text size="sm">
              Zapisz się, wyrażasz zgodę na otrzymywanie aktualizacji i
              akceptujesz naszą Politykę prywatności.
            </Text>
          </div>
          <div>
            <Text>Szubkie linki</Text>
            <ul className="mt-2">
              {Object.entries(navigation).map(([name, path]) => (
                <li key={path} className="hover:text-primary hover:underline">
                  <Link href={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Text>Bądź na bieżąco</Text>
            <div className="mt-2 flex items-start gap-2 text-primary">
              <Facebook />
              <Instagram />
              <Twitter />
              <Linkedin />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex flex-col-reverse items-center justify-between py-2 text-center md:flex-row md:py-4">
        <Text size="sm">
          © {new Date().getFullYear()} Eleven Flower Studio. Wszystkie prawa
          zastrzeżone.
        </Text>
        <Link
          href="/policy-privacy"
          className="mb-2 text-sm hover:text-primary hover:underline md:mb-0"
        >
          Polityka prywatności
        </Link>
      </MaxWidthWrapper>
    </footer>
  );
}
