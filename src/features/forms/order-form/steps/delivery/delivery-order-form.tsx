"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { StepIndicator } from "../../components/step-indicator";
import { useTranslations } from "next-intl";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  DELIVERY_FORM_DEFAULT_VALUES,
  ORDERER_FORM_DEFAULT_VALUES,
  RECIPIENT_FORM_DEFAULT_VALUES,
} from "../../lib/constants/delivery-form.constants";
import {
  type DeliveryFormSchema,
  type OrdererFormSchema,
  type RecipientFormSchema,
} from "../../lib/schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { handleScroll } from "../../lib/helpers";
import { RecipientInfoForm } from "./recipient-info-step";
import { DeliveryInfoForm } from "./address-info-step";
import { AnimatePresence, motion } from "framer-motion";
import { OrderingInfoForm } from "./orderer-info-step";
import {
  STEP_ANIMATION_TRANSITION,
  STEP_ANIMATION_VARIANTS,
} from "../../lib/constants/animation-variants";
import { useCart } from "@/context/cart-context";

export function DeliveryOrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setCartItems } = useCart();

  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = useTranslations("pages.cart_summary.forms.delivery");
  const tStepsList = t.raw("step_indicator") as string[];
  const tError = useTranslations("messages.error");

  const [recipientValues, setRecipientValues] =
    useLocalStorage<RecipientFormSchema>(
      "delivery-order-form.recipient-info",
      () => RECIPIENT_FORM_DEFAULT_VALUES,
    );

  const [deliveryValues, setDeliveryValues] =
    useLocalStorage<DeliveryFormSchema>(
      "delivery-order-form.delivery-info",
      () => DELIVERY_FORM_DEFAULT_VALUES,
    );

  const [ordererValues, setOrdererValues] = useLocalStorage<OrdererFormSchema>(
    "delivery-order-form.ordering-info",
    () => ORDERER_FORM_DEFAULT_VALUES,
  );

  function resetLocalStorageValues() {
    setRecipientValues(RECIPIENT_FORM_DEFAULT_VALUES);
    setDeliveryValues(DELIVERY_FORM_DEFAULT_VALUES);
    setOrdererValues(ORDERER_FORM_DEFAULT_VALUES);
  }

  const { mutate: createOrderWithDelivery, isPending } =
    api.public.order.createWithDetails.useMutation({
      onSuccess: () => {
        resetLocalStorageValues();
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

  function onSubmitForm(orderingVal: OrdererFormSchema) {
    if (deliveryValues.date == null || deliveryValues.time == null) {
      toast.warning(tError("form_validation_error"));
      return;
    }
    const values = {
      recipientFormData: {
        address: deliveryValues.address,
        city: deliveryValues.city,
        postalCode: deliveryValues.postalCode,
        name: recipientValues.name,
        phone: recipientValues.phone,
        flowerMessage: recipientValues.flowerMessage,
      },
      orderingFormData: {
        date: new Date(deliveryValues.date),
        time: deliveryValues.time,
        name: orderingVal.name,
        phone: orderingVal.phone,
        email: orderingVal.email,
        description: orderingVal.description,
      },
    };
    createOrderWithDelivery(values);
  }

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

  const steps = [
    <RecipientInfoForm
      key="step-0"
      values={recipientValues}
      setValues={setRecipientValues}
      onNext={handleNextStep}
    />,
    <DeliveryInfoForm
      key="step-1"
      values={deliveryValues}
      setValues={setDeliveryValues}
      onNext={handleNextStep}
      onPrev={handlePrevStep}
    />,
    <OrderingInfoForm
      key="step-2"
      isPending={isPending}
      values={ordererValues}
      setValues={setOrdererValues}
      onPrev={handlePrevStep}
      onSubmitForm={onSubmitForm}
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
