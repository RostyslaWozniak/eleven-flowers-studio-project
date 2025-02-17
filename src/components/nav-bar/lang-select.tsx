"use client";
import { redirect, usePathname } from "@/i18n/routing";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { type ChangeEvent, useTransition } from "react";
import { api } from "@/trpc/react";

export function LangSelect() {
  const [isPending, startTransition] = useTransition();

  const { locale } = useParams();

  const pathname = usePathname();

  const utils = api.useUtils();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      void utils.public.cart.getCartItems.invalidate();
      redirect({ locale: nextLocale, href: pathname });
    });
  };

  return (
    <div className="flex min-w-16 items-center justify-center border-none font-philosopher text-xl text-primary">
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <label htmlFor="lang-select" className="sr-only">
            Select Language
          </label>
          <select
            id="lang-select"
            defaultValue={locale}
            className="cursor-pointer bg-transparent px-2"
            onChange={onSelectChange}
            disabled={isPending}
          >
            <option value="en">en</option>
            <option value="pl">pl</option>
            <option value="ru">ru</option>
          </select>
        </>
      )}
    </div>
  );
}
