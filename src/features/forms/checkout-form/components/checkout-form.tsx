"use client";

import { useRef, useState } from "react";
import { StepIndicator } from "./step-indicator";
import { RecipientDataForm } from "./recipient-data-form";
import { DeliveryDataForm } from "./delivery-data-form";
import { OrderingDataForm } from "./ordering-data.form";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { type RecipientFormSchema } from "../lib/schema/recipient-form.schema";
import { type DeliveryFormSchema } from "../lib/schema/delivery-form.schema";
import { type OrderingFormSchema } from "../lib/schema/ordering-form.schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowsUpFromLineIcon, CarIcon, CheckIcon } from "lucide-react";
import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";
import { cn } from "@/lib/utils";

const stepAnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const stepAnimationTransition = { duration: 0.5 };

const recipientFormDefaultValues = {
  name: "",
  phone: "",
  flowerMessage: "",
};
const deliveryFormDefaultValues = {
  address: "",
  city: "",
  postalCode: "",
  date: new Date(),
  time: "10:00-13:00" as const,
};
const orderingFormDefaultValues = {
  name: "",
  phone: "",
  email: "",
  description: "",
};

export function CheckoutForm() {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [currentStep, setCurrentStep] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = useTranslations("pages.cart_summary.forms.delivery");
  const tStepsList = t.raw("step_indicator") as string[];
  const tError = useTranslations("messages.error");

  const [recipientValues, setRecipientValues] =
    useLocalStorage<RecipientFormSchema>(
      "checkout-form.recipient-data",
      () => recipientFormDefaultValues,
    );

  const [deliveryValues, setDeliveryValues] =
    useLocalStorage<DeliveryFormSchema>(
      "checkout-form.delivery-data",
      () => deliveryFormDefaultValues,
    );

  const [orderingValues, setOrderingValues] =
    useLocalStorage<OrderingFormSchema>(
      "checkout-form.ordering-data",
      () => orderingFormDefaultValues,
    );

  const { mutate: createOrderWithDelivery, isPending } =
    api.public.order.createWithDetails.useMutation({
      onSuccess: () => {
        setRecipientValues(recipientFormDefaultValues);
        setDeliveryValues(deliveryFormDefaultValues);
        setOrderingValues(orderingFormDefaultValues);
        router.push("/payment");
      },
      onError: () => {
        toast.error(tError("title"), {
          className: "bg-destructive text-destructive-foreground",
          position: "top-right",
        });
      },
    });

  function onSubmitForm(orderingVal: OrderingFormSchema) {
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

  function handleScroll() {
    if (!formRef.current) return;

    const formTop = formRef.current.getBoundingClientRect().top;

    if (formTop < 0) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleNextStep() {
    const nextStep =
      currentStep === tStepsList.length - 1 ? currentStep : currentStep + 1;
    setCurrentStep(nextStep);
    handleScroll();
  }

  function handlePrevStep() {
    const prevStep = currentStep === 0 ? 0 : currentStep - 1;
    setCurrentStep(prevStep);
    handleScroll();
  }
  const steps = [
    <RecipientDataForm
      key="step-0"
      values={recipientValues}
      setValues={setRecipientValues}
      onNext={handleNextStep}
    />,
    <DeliveryDataForm
      key="step-1"
      values={deliveryValues}
      setValues={setDeliveryValues}
      onNext={handleNextStep}
      onPrev={handlePrevStep}
    />,
    <OrderingDataForm
      key="step-2"
      isPending={isPending}
      values={orderingValues}
      setValues={setOrderingValues}
      onPrev={handlePrevStep}
      onSubmitForm={onSubmitForm}
    />,
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 px-2 pb-8">
        <button
          className={cn(
            "flex w-full flex-col items-center rounded-md border border-slate-200 p-2",
            {
              "bg-card": deliveryMethod === "delivery",
            },
          )}
          onClick={() => setDeliveryMethod("delivery")}
        >
          <div className="relative aspect-square">
            <ToggleAnimation
              className="h-8 text-primary"
              firstComp={<CarIcon className="size-full" />}
              secondComp={<CheckIcon className="size-full" />}
              isActive={deliveryMethod === "delivery"}
            />
          </div>
          <p className="text-sm">Dostawa</p>
        </button>
        <button
          className={cn(
            "flex w-full flex-col items-center rounded-md border border-slate-200 p-2",
            {
              "bg-card": deliveryMethod === "pickup",
            },
          )}
          onClick={() => setDeliveryMethod("pickup")}
        >
          <div className="relative aspect-square">
            <ToggleAnimation
              className="h-8 text-primary"
              firstComp={<ArrowsUpFromLineIcon className="size-full" />}
              secondComp={<CheckIcon className="size-full" />}
              isActive={deliveryMethod === "pickup"}
            />
          </div>
          <p className="text-sm">Odbóir osobisty</p>
        </button>
      </div>
      {deliveryMethod === "delivery" && (
        <div
          ref={formRef}
          className="min-h-[700px] scroll-m-5 px-2 md:min-h-[660px]"
        >
          <StepIndicator currentStep={currentStep} steps={tStepsList} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepAnimationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={stepAnimationTransition}
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {deliveryMethod === "pickup" && (
        <div className="min-h-[660px]">Pickup</div>
      )}
    </>
  );
}
