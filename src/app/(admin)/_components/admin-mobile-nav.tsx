"use client";

import { cn } from "@/lib/utils";
import {
  Grid2x2PlusIcon,
  ImageIcon,
  PackageIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  {
    href: "/dashboard/products",
    label: "Products",
    icon: PackageIcon,
  },
  {
    href: "/dashboard/collections",
    label: "Collections",
    icon: Grid2x2PlusIcon,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/images",
    label: "Images",
    icon: ImageIcon,
  },
];

export function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-2 z-[999] mx-auto w-[94vw] rounded-full bg-white/70 bg-opacity-70 backdrop-blur-sm backdrop-brightness-90 md:hidden">
      <div className="mx-auto max-w-md px-4">
        <ul className="grid grid-cols-4">
          {sidebarItems.map(({ href, icon: Icon, label }) => (
            <NavItem
              key={href}
              href={href}
              icon={<Icon className="h-5 w-5" />}
              label={label}
              isActive={pathname === href}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  const router = useRouter();
  return (
    <li>
      <Link
        onTouchStart={() => router.push(href)}
        href={href}
        className={cn(
          "pointer-events-auto flex flex-col items-center p-2 text-gray-600 transition-colors duration-200",
          {
            "text-primary": isActive,
          },
        )}
      >
        <span
          className={cn(
            "inline-block transform rounded-full bg-gray-50 p-1.5 text-gray-800 transition-all duration-200 ease-in-out",
            {
              "text-primary": isActive,
            },
          )}
        >
          {icon}
        </span>
        <span className="mt-0.5 text-xs font-medium">{label}</span>
      </Link>
    </li>
  );
}
