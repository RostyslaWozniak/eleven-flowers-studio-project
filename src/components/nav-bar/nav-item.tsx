"use client";

import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "mx-1 flex h-full items-center font-medium capitalize tracking-wider transition-opacity hover:opacity-70",
        {
          "border-b-[3px] border-primary font-bold text-primary hover:opacity-70":
            pathname
              .replace("/en", "")
              .replace("/ru", "")
              .replace("/pl", "") === href,
        },
      )}
    >
      {children}
    </div>
  );
}
