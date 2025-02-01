"use client";
import { usePathname, getPathname } from "@/i18n/routing";
import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useTransition } from "react";

export function LangSelect() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    console.log({ path: pathname.length > 1 ? pathname : "1" });
    router.push(nextLocale);
    startTransition(() => {
      router.push(getPathname({ href: pathname, locale: nextLocale }));
      router.refresh();
    });
  };

  return (
    <div className="flex min-w-16 items-center justify-center border-none font-philosopher text-xl text-primary">
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <select
          defaultValue={localActive}
          className="cursor-pointer bg-transparent px-2"
          onChange={onSelectChange}
          disabled={isPending}
        >
          <option value="en">en</option>
          <option value="pl">pl</option>
          <option value="ru">ru</option>
        </select>
      )}
    </div>
  );
}
