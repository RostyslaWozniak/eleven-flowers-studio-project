"use client";
import { redirect, usePathname } from "@/i18n/routing";
import { Loader } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { useParams } from "next/navigation";
import { type ChangeEvent, useTransition } from "react";

export function LangSelect() {
  const [isPending, startTransition] = useTransition();

  const { locale } = useParams();

  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      redirect({ locale: nextLocale, href: pathname });
      setRequestLocale(nextLocale);
    });
  };

  return (
    <div className="flex min-w-16 items-center justify-center border-none font-philosopher text-xl text-primary">
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <select
          defaultValue={locale}
          className="cursor-pointer bg-transparent px-2"
          onChange={onSelectChange}
          disabled={isPending}
        >
          <option value="en">en</option>
          <option value="pl">pl</option>
          <option value="ru">ru</option>
        </select>
        // <div className="space-x-2">
        //   <a href="en">en</a>
        //   <a href="pl">pl</a>
        //   <a href="ru">ru</a>
        // </div>
      )}
    </div>
  );
}
