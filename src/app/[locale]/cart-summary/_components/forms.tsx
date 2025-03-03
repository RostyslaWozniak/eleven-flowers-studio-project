"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { type RecipientFormSchema } from "@/lib/validation/recipient-form-schema";
import { RecipientForm } from "./recipient-form";
import OrderingForm from "./ordering-form";

export default function Forms() {
  // is first form open or not
  const [isRecipientFormOpen, setIsRecipientFormOpen] = useState(true);
  // store data for first form (date, time and optional description)
  const [recipientFormData, setRecipientFormData] =
    useState<RecipientFormSchema>({
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      flowerMessage: "",
      // name: "odboirca_name",
      // phone: "odboirca_phone",
      // address: "odboirca_address",
      // city: "odboirca_city",
      // postalCode: "01-001",
      // flowerMessage: "",
    });

  return (
    <div className="relative h-[750px] w-full overflow-y-hidden px-2.5 md:pl-12 md:pr-2">
      <AnimatePresence>
        {isRecipientFormOpen && (
          <RecipientForm
            recipientFormData={recipientFormData}
            setRecipientFormData={setRecipientFormData}
            setIsRecipientFormOpen={setIsRecipientFormOpen}
          />
        )}
      </AnimatePresence>

      {!isRecipientFormOpen && (
        <OrderingForm
          recipientFormData={recipientFormData}
          setIsRecipientFormOpen={setIsRecipientFormOpen}
        />
      )}
    </div>
  );
}
