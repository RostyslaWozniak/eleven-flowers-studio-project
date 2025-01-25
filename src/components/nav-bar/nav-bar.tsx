import { ShoppingBag } from "lucide-react";
import { NavItem } from "./nav-item";
import { navigation } from "@/lib/navigation";
import { Logo1 } from "../ui/logo";
import Link from "next/link";

export function NavBar() {
  return (
    <header className="inset-x-0 top-0 z-50 w-screen bg-background/70 shadow-md shadow-foreground/20 backdrop-blur-sm md:sticky">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex h-16 items-center justify-between px-2">
          <Link href="/">
            <Logo1 className="z-50 h-10 w-32 border md:h-12" />
          </Link>

          <nav className="itens-center hidden w-full md:flex">
            <div className="flex h-full flex-grow justify-center">
              <ul className="flex h-16">
                {Object.entries(navigation).map(([name, path]) => (
                  <li key={name}>
                    <NavItem name={name} href={path} />
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <p className="font-philosopher text-xl text-primary">PL</p>
          </div>
        </div>
      </div>
    </header>
  );
}
