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
import { useState } from "react";

export function CartSheet() {
  const { cartItems } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <CartSheetTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
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
