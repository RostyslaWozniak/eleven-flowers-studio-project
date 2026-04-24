"use client";

import { DeliveryMethodsButtons } from "../components/delivery-methods-buttons";
import { DeliveryOrderForm } from "./delivery/delivery-order-form";
import { PickupOrderForm } from "./pickup/pickup-order-form";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart-context";

export function DeliveryMethodSelection() {
  const { deliveryMethod } = useCart();

  return (
    <>
      <DeliveryMethodsButtons />
      <AnimatePresence mode="wait">
        {deliveryMethod === "delivery" && (
          <motion.div
            key="delivery"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DeliveryOrderForm />
          </motion.div>
        )}
        {deliveryMethod === "pickup" && (
          <motion.div
            key="pickup"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PickupOrderForm />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
