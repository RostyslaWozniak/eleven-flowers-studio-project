"use client";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const EmptyCart = () => {
  const t = useTranslations("cart.cart_sheet.empty");
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-4 text-center">
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ShoppingBag className="h-24 w-24 text-gray-300" />
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-2xl font-semibold"
      >
        {t("title")}
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-4 text-gray-500"
      >
        {t("subtitle")}
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <SheetClose asChild>
          <Link
            href="/products"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {t("button")}
          </Link>
        </SheetClose>
      </motion.div>
    </div>
  );
};
