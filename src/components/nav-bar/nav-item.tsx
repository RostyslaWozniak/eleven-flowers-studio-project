"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function NavItem({ name, href }: { name: string; href: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "mx-1 flex h-full items-center px-4 font-medium capitalize tracking-wider transition-opacity hover:opacity-70",
        {
          "border-b-[3px] border-primary font-bold text-primary hover:opacity-70":
            pathname === href,
        },
      )}
    >
      {name}
    </Link>
  );
}
