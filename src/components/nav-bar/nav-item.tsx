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
        "mx-1 flex h-full items-center border-b-2 border-transparent font-medium capitalize tracking-wider transition-opacity hover:opacity-70",
        {
          "border-primary text-primary hover:opacity-70":
            pathname
              .replace("/en", "")
              .replace("/ru", "")
              .replace("/pl", "") === href,
        },
      )}
    >
      <div className="translate-y-0.5 text-sm">{children}</div>
    </div>
  );
}
