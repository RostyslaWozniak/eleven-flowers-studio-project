"use client";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useTransition } from "react";

export function LandSelect() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.push(`/${nextLocale}/${pathname}`);
    });
  };

  return (
    <div className="border-none font-philosopher text-xl text-primary">
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
    </div>
  );
}
