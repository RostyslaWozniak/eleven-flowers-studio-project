"use client";
import { usePathname, getPathname } from "@/i18n/routing";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type ChangeEvent, useTransition } from "react";

export function LangSelect() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
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
          defaultValue={locale}
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
