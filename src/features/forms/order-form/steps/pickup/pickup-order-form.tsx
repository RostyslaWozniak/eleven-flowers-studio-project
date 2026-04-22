"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { StepIndicator } from "../../components/step-indicator";
import { PICKUP_DATE_AND_TIME_DEFAULT_VALUES } from "../../lib/constants/pickup-form.constants";
import { PickupDatAndTimeFormSchema } from "../../lib/schema";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  STEP_ANIMATION_TRANSITION,
  STEP_ANIMATION_VARIANTS,
} from "../../lib/constants/animation-variants";
import { PickupDateAndTimeStep } from "./pickup-date-time-step";
import { PickupOrdererInfoStep } from "./pickup-orderer-info-step";

export function PickupOrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //   const t = useTranslations("pages.cart_summary.forms.delivery");
  //   const tStepsList = t.raw("step_indicator") as string[];
  //   const tError = useTranslations("messages.error");

  const tStepsList = ["Date", "Your Details"];

  const [dateAndTimeValues, setDateAndTimeValues] =
    useLocalStorage<PickupDatAndTimeFormSchema>(
      "checkout-form.recipient-data",
      () => PICKUP_DATE_AND_TIME_DEFAULT_VALUES,
    );

  const steps = [
    <PickupDateAndTimeStep
      key="step-0"
      //   values={recipientValues}
      //   setValues={setRecipientValues}
      //   onNext={handleNextStep}
    />,
    <PickupOrdererInfoStep
      key="step-1"
      //   values={deliveryValues}
      //   setValues={setDeliveryValues}
      //   onNext={handleNextStep}
      //   onPrev={handlePrevStep}
    />,
  ];

  return (
    <div
      ref={formRef}
      className="min-h-[700px] scroll-m-5 px-2 md:min-h-[660px]"
    >
      <StepIndicator currentStep={currentStep} steps={tStepsList} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={STEP_ANIMATION_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={STEP_ANIMATION_TRANSITION}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
