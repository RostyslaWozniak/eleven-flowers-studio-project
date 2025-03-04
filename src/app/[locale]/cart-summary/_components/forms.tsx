"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { type RecipientFormSchema } from "@/lib/validation/recipient-form-schema";
import { RecipientForm } from "./recipient-form";
import OrderingForm from "./ordering-form";
import { IS_LOCAL_PROJECT } from "@/components/environment-banner";
import { cn } from "@/lib/utils";

export default function Forms() {
  // is first form open or not
  const [isRecipientFormOpen, setIsRecipientFormOpen] = useState(true);
  // store data for first form (date, time and optional description)
  const [recipientFormData, setRecipientFormData] =
    useState<RecipientFormSchema>(
      IS_LOCAL_PROJECT
        ? {
            name: "recipient_name",
            phone: "recipient_phone",
            address: "recipient_address",
            city: "recipient_city",
            postalCode: "01-001",
            flowerMessage: "",
          }
        : {
            name: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            flowerMessage: "",
          },
    );

  return (
    <div
      className={cn(
        "relative h-[850px] w-full overflow-y-hidden px-1 md:pl-12 md:pr-2",
        {
          "h-[900px]": !isRecipientFormOpen,
        },
      )}
    >
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
