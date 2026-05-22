"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { StepIndicator } from "../../components/step-indicator";
import {
  PICKUP_DATE_AND_TIME_DEFAULT_VALUES,
  PICKUP_ORDERER_FORM_DEFAULT_VALUES,
} from "../../lib/constants/pickup-form.constants";
import { type PickupDatAndTimeFormSchema } from "../../lib/schema";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  STEP_ANIMATION_TRANSITION,
  STEP_ANIMATION_VARIANTS,
} from "../../lib/constants/animation-variants";
import { PickupOrdererInfoStep } from "./pickup-orderer-info-step";
import { handleScroll } from "../../lib/helpers";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { PickupDetailsStep } from "./pickup-details-step";
import { type PickupOrdererFormSchema } from "../../lib/schema/pickup-orderer-form.schema";
import { type $Enums } from "@prisma/client";

export function PickupOrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setCartItems } = useCart();

  const t = useTranslations("pages.cart_summary.forms.pickup");
  const tStepsList = t.raw("step_indicator") as string[];
  const tError = useTranslations("messages.error");

  const [dateAndTimeValues, setDateAndTimeValues] =
    useLocalStorage<PickupDatAndTimeFormSchema>(
      "pickup-form.date-and-time",
      () => PICKUP_DATE_AND_TIME_DEFAULT_VALUES,
    );

  const [ordererValues, setOrdererValues] =
    useLocalStorage<PickupOrdererFormSchema>(
      "pickup-form.orderer-info",
      () => PICKUP_ORDERER_FORM_DEFAULT_VALUES,
    );

  function handleNextStep() {
    const nextStep =
      currentStep === tStepsList.length - 1 ? currentStep : currentStep + 1;
    setCurrentStep(nextStep);
    handleScroll(formRef);
  }

  function handlePrevStep() {
    const prevStep = currentStep === 0 ? 0 : currentStep - 1;
    setCurrentStep(prevStep);
    handleScroll(formRef);
  }

  const { mutate: createPickupOrder, isPending } =
    api.public.order.createPickupOrder.useMutation({
      onSuccess: () => {
        setDateAndTimeValues(PICKUP_DATE_AND_TIME_DEFAULT_VALUES);
        setOrdererValues(PICKUP_ORDERER_FORM_DEFAULT_VALUES);
        router.push("/payment");
        setCartItems([]);
      },
      onError: () => {
        toast.error(tError("title"), {
          className: "bg-destructive text-destructive-foreground",
          position: "top-right",
        });
      },
    });
  const {
    mutate: createPickupOrderWithoutPayment,
    isPending: isPendingWithoutPayment,
  } = api.public.order.createPickupOrder.useMutation({
    onSuccess: () => {
      setDateAndTimeValues(PICKUP_DATE_AND_TIME_DEFAULT_VALUES);
      setOrdererValues(PICKUP_ORDERER_FORM_DEFAULT_VALUES);
      router.push("/purchase-success");
      setCartItems([]);
    },
    onError: () => {
      toast.error(tError("title"), {
        className: "bg-destructive text-destructive-foreground",
        position: "top-right",
      });
    },
  });

  function onSubmitForm(
    ordererVal: PickupOrdererFormSchema,
    paymentStatus: $Enums.PaymentStatus,
  ) {
    if (dateAndTimeValues.date == null || dateAndTimeValues.time == null) {
      toast.warning(tError("form_validation_error"));
      return;
    }
    if (paymentStatus === "PENDING") {
      createPickupOrder({
        pickupOrdererFormSchema: ordererVal,
        pickupDetailsFormSchema: {
          ...dateAndTimeValues,
          date: new Date(dateAndTimeValues.date),
        },
      });
    } else if (paymentStatus === "PAID_ON_DELIVERY") {
      createPickupOrderWithoutPayment({
        pickupOrdererFormSchema: ordererVal,
        pickupDetailsFormSchema: {
          ...dateAndTimeValues,
          date: new Date(dateAndTimeValues.date),
        },
      });
    }
  }

  const steps = [
    <PickupDetailsStep
      key="step-0"
      values={dateAndTimeValues}
      setValues={setDateAndTimeValues}
      onNext={handleNextStep}
    />,
    <PickupOrdererInfoStep
      key="step-1"
      isPending={isPending || isPendingWithoutPayment}
      values={ordererValues}
      setValues={setOrdererValues}
      onSubmitForm={onSubmitForm}
      onPrev={handlePrevStep}
    />,
  ];

  return (
    <div
      ref={formRef}
      className="min-h-[700px] scroll-m-5 px-2 md:min-h-[660px]"
    >
      <div className="mx-auto max-w-sm">
        <StepIndicator currentStep={currentStep} steps={tStepsList} />
      </div>
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
