"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";

import { CartItem } from "./cart-item";
import { CartSheetTrigger } from "./cart-sheet-triger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "../ui/button";
import { EmptyCart } from "./empty-cart";
import { cn, formatPrice } from "@/lib/utils";

export function CartSheet() {
  const { cartItems, isCartOpen, totalPrice, totalItems, setIsCartOpen } =
    useCart();

  const t = useTranslations("Cart");

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <CartSheetTrigger isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

      <SheetContent className="flex flex-col p-2 pb-24 lg:p-4 lg:pb-4">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex-grow">
          {cartItems.length === 0 && <EmptyCart />}
          <div>
            {cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
        </div>
        <div className="flex min-h-16 items-center justify-between">
          {totalItems > 0 && (
            <>
              <div>
                <p className="text-xl">
                  {t("totalPrice")}:{" "}
                  <span className="font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </p>
                <p className="text-lg">
                  {t("totalItems")}:{" "}
                  <span className="font-semibold">{totalItems}</span>
                </p>
              </div>

              <Link
                onClick={() => setIsCartOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-min px-4",
                )}
                href="/cart-summary"
              >
                {t("button")}
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
