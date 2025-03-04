"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations("messages.error");
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <div className="mt-4 text-2xl">{t("title")}</div>
          <div>{t("sorry_message")}</div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild>
            <Link href="/">{t("back_to_home")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
