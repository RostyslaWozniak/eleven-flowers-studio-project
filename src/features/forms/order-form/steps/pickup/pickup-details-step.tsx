"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  formItemClassName,
  labelClassName,
} from "../../lib/constants/form-class-names";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FlowerIcon,
  PenIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { H2 } from "@/components/ui/typography";
import { DateFormItem } from "../../components/date-form-item";
import { TimeFormItem } from "../../components/time-form-item";
import {
  pickupDetailsFormSchema,
  type PickupDetailsFormSchema,
} from "../../lib/schema/pickup-details-form.schema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";
import { useMediaQuery } from "@/hooks/use-media-query";

type PickupDetailsStepProps = {
  values: PickupDetailsFormSchema;
  setValues: React.Dispatch<React.SetStateAction<PickupDetailsFormSchema>>;
  onNext: () => void;
};

export function PickupDetailsStep({
  values,
  setValues,
  onNext,
}: PickupDetailsStepProps) {
  const form = useForm<PickupDetailsFormSchema>({
    resolver: zodResolver(pickupDetailsFormSchema),
    defaultValues: {
      date: values.date ? new Date(values?.date) : undefined,
      time: values.time,
      flowerMessage: values.flowerMessage,
      description: values.description,
    },
  });

  const t = useTranslations(
    "pages.cart_summary.forms.pickup.pickup_details_form",
  );
  const tField = useTranslations(
    "pages.cart_summary.forms.pickup.pickup_details_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");

  const tError = useTranslations("messages.error");

  function onSubmit(values: PickupDetailsFormSchema) {
    setValues(values);
    onNext();
  }
  const selectedDate = form.watch("date");

  return (
    <>
      <H2 className="text-start font-light md:mb-4 md:text-start">
        {t("title")}
      </H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="min-h-64 space-y-4">
            <div className="grid gap-x-4 gap-y-5 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <DateFormItem
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.date?.message}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <TimeFormItem
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.time?.message}
                    selectedDate={selectedDate}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormControl>
                    <HiddenTextarea
                      label={tField("description.label")}
                      icon={PenIcon}
                      name="description"
                      className=""
                      placeholder={tField("description.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.formState.errors.flowerMessage && (
                    <span className="text-xs text-destructive">
                      ({tError(form.formState.errors.flowerMessage.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flowerMessage"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormControl>
                    <HiddenTextarea
                      label={tField("message.label")}
                      icon={FlowerIcon}
                      name="flowerMessage"
                      className=""
                      placeholder={tField("message.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.formState.errors.flowerMessage && (
                    <span className="text-xs text-destructive">
                      ({tError(form.formState.errors.flowerMessage.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-3">
              <LoadingButton
                loading={false}
                type="submit"
                size="md"
                variant="outline"
              >
                {tButtons("next")}
                <ChevronRightIcon />
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
export type HiddenTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    icon: React.ElementType;
    value: string | undefined;
  };

function HiddenTextarea({
  label,
  className,
  placeholder,
  value,
  onChange,
  icon: Icon,

  ...props
}: HiddenTextareaProps) {
  const isValue = !!value && value?.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const isDesctop = useMediaQuery();
  return (
    <div className="space-y-1">
      {!isOpen ? (
        <>
          <Button
            variant="outline"
            type="button"
            size="md"
            className="w-full max-w-full"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="flex flex-grow items-center gap-x-2">
              <Icon />{" "}
              {isOpen
                ? label
                : (isValue ? "Edytuj " : "Dodaj ") + label.toLocaleLowerCase()}
            </div>
            <ToggleAnimation
              firstComp={<ChevronDownIcon />}
              secondComp={<ChevronUpIcon />}
              isActive={isOpen}
            />
          </Button>
          {value && value.length > 0 && (
            <div>
              <p className="px-4">{value}</p>
            </div>
          )}
        </>
      ) : (
        <motion.div className="flex flex-col">
          <FormLabel className={cn("mb-2", labelClassName)}>{label}</FormLabel>
          <div className="flex flex-col gap-1">
            <Textarea
              autoFocus
              name="flowerMessage"
              className={cn("h-min min-h-20", className)}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              {...props}
            />

            <Button
              variant="default"
              size={isDesctop ? "sm" : "md"}
              className="md:self-end"
              onClick={() => setIsOpen(false)}
            >
              Ok
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
