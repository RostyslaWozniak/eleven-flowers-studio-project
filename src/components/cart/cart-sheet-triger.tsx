"use client";

import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

type CartSheetTriggerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartSheetTrigger = ({
  isOpen,
  setIsOpen,
}: CartSheetTriggerProps) => {
  const { cartItems } = useCart();
  const tNav = useTranslations("navigation");

  return (
    <motion.div
      className={cn("flex flex-col items-center", {
        "text-primary": isOpen,
      })}
      key={cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1 * 10}
      initial={cartItems.length > 0}
      animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
    >
      <Button
        aria-label="cart-button"
        className="pointer-events-auto relative flex flex-col items-center rounded-full p-0 transition-colors duration-200 md:text-gray-600"
        size="icon"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={cn(
            "rounded-full bg-gray-50 p-2 transition-all duration-200 ease-in-out md:bg-gray-50",
            {
              "text-primary": isOpen,
            },
          )}
        >
          <ShoppingBag className="min-h-6 min-w-6 stroke-[2px]" />
        </div>

        {cartItems.length > 0 && (
          <div
            key={cartItems.length + 1}
            className="absolute -bottom-2 -right-2 aspect-square h-5 rounded-full bg-primary text-center text-primary-foreground lg:-bottom-1 lg:-right-1"
          >
            <p className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm tracking-tighter">
              {cartItems.length}
            </p>
          </div>
        )}
      </Button>
      <span className="mt-1 translate-y-0.5 text-center text-xs font-medium md:hidden">
        {tNav("cart")}
      </span>
    </motion.div>
  );
};
