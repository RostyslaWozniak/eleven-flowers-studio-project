"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Navigation } from "@/lib/navigation";

export function NavItem({ name, href }: { name: string; href: Navigation }) {
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
