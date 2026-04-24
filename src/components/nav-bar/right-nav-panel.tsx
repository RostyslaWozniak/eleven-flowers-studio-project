"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { CartSheet } from "../cart/cart-sheet";
import { LangSwitcher } from "./lang-select-dialog";

export default function RightNavPanel() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="flex items-center gap-3">
      {isDesktop && <CartSheet />}
      <LangSwitcher />
      {/* <LangSelect /> */}
    </div>
  );
}
