"use client";
import IconMenu from "@/components/ui/icon-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid2x2Plus, Image, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

const sidebarItems = [
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/dashboard/collections",
    label: "Collections",
    icon: Grid2x2Plus,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/images",
    label: "Images",
    icon: Image,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="relative hidden min-w-min md:block">
      <nav className="sticky top-20 space-y-8 pr-4">
        <div>
          <h2 className="mb-2 text-xs uppercase">menu</h2>
          <ul className="flex flex-col items-start gap-y-1">
            {sidebarItems.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className={cn("", {
                  "mt-2 border-t pt-2 text-muted-foreground":
                    label === "Settings",
                })}
              >
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant:
                        pathname.split("/")[2] === href.split("/")[2]
                          ? "secondary"
                          : "ghost",
                      size: "lg",
                    }),
                  )}
                >
                  <IconMenu
                    icon={Icon}
                    text={label}
                    className="text-base"
                    iconSize={24}
                  />
                </Link>
              </li>
            ))}
            <li className="mt-2 w-full border-t pt-4 text-muted-foreground">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};
