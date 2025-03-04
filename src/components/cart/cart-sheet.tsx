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
import { ScrollArea } from "../ui/scroll-area";

export function CartSheet() {
  const { cartItems, isCartOpen, totalPrice, totalItems, setIsCartOpen } =
    useCart();

  const t = useTranslations("cart.cart_sheet");

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <CartSheetTrigger isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

      <SheetContent className="z-[70] flex max-h-screen flex-col gap-y-0 p-0 pb-20 lg:pb-0">
        <SheetHeader className="flex h-16 items-center justify-center bg-secondary">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {cartItems.length === 0 && <EmptyCart />}
        <ScrollArea className="flex-grow pl-2 md:px-4">
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))}
        </ScrollArea>
        <div
          className={cn(
            "z-10 flex max-h-20 flex-grow items-center justify-between bg-secondary px-2 py-4 md:px-4 lg:py-6",
          )}
        >
          {totalItems > 0 && (
            <>
              <div>
                <p className="text-xl">
                  {t("total_price")}:{" "}
                  <span className="font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </p>
                <p className="text-lg">
                  {t("total_items")}:{" "}
                  <span className="font-semibold text-primary">
                    {totalItems}
                  </span>
                </p>
              </div>

              <Link
                onClick={() => setIsCartOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 w-min px-4",
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
