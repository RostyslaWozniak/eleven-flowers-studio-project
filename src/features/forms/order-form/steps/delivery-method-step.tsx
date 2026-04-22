"use client";

import { useState } from "react";
import { DeliveryMethodsButtons } from "../components/delivery-methods-buttons";
import { DeliveryOrderForm } from "./delivery/delivery-order-form";
import { PickupOrderForm } from "./pickup/pickup-order-form";
import { AnimatePresence, motion } from "framer-motion";
import { type DeliveryMethod } from "../types/delivery-methods.type";

export function DeliveryMethodSelection() {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");
  return (
    <>
      <DeliveryMethodsButtons
        deliveryMethod={deliveryMethod}
        onClick={(method: DeliveryMethod) => setDeliveryMethod(method)}
      />
      <div className="">
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
      </div>
    </>
  );
}
