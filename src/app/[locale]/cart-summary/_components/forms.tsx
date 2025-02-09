"use client";

import { useState } from "react";

import {
  DELIVERY_TIME_SLOTS,
  type DateAndMethodFormSchema,
} from "@/lib/validation/date-and-method-form-schema";
import { AnimatePresence } from "framer-motion";
import { DateAndMethodForm } from "./date-and-method-form";
import DeliveryForm from "./delivery-form";
import PickupForm from "./pickup-form";

export default function Forms() {
  // state for selected in first form method, if delivery open delivery form, if pickup open pickup form
  const [isDelivery, setIsDelivery] = useState(true);
  // is first form open or not
  const [isDateAndMethodFormOpen, setIsDateAndMethodFormOpen] = useState(true);
  // store data for first form (date, time and optional description)
  const [dateAndMethodData, setDateAndMethodData] =
    useState<DateAndMethodFormSchema>({
      date: new Date(),
      time: DELIVERY_TIME_SLOTS[0],
      deliveryMethod: isDelivery ? "delivery" : "pickup",
      description: "",
    });

  return (
    <div className="h-[550px] w-full overflow-y-hidden overflow-x-visible px-2.5 md:pl-12 md:pr-2">
      <AnimatePresence>
        {isDateAndMethodFormOpen && (
          <DateAndMethodForm
            dateAndMethodData={dateAndMethodData}
            setDateAndMethodData={setDateAndMethodData}
            setIsDateAndMethodFormOpen={setIsDateAndMethodFormOpen}
            setIsDelivery={setIsDelivery}
          />
        )}
      </AnimatePresence>
      {!isDateAndMethodFormOpen &&
        (isDelivery ? (
          <DeliveryForm dateAndMethodData={dateAndMethodData} />
        ) : (
          <PickupForm dateAndMethodData={dateAndMethodData} />
        ))}
    </div>
  );
}
