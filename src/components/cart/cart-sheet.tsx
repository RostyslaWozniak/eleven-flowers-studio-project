"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "./cart-item";

export function CartSheet() {
  const { cartItems } = useCart();
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingBag className="hidden h-7 w-7 text-primary lg:block" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} items in your cart.
          </SheetDescription>
        </SheetHeader>
        <div>
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
