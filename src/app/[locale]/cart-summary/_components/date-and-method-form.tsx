"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, useForm } from "react-hook-form";
import { H2 } from "@/components/ui/typography";
import {
  type DateAndMethodFormSchema,
  type DeliveryMethodsSlot,
  type DeliveryTimeSlot,
  dateAndMethodFormSchema,
} from "@/lib/validation/date-and-method-form-schema";
import { type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { DateSelect } from "./date-select";
import { TimeSelect } from "./time-select";
import { MethodSelect } from "./method-select";
import { useTranslations } from "next-intl";

export type DeliveryFormControl = Control<
  {
    date: Date;
    time: DeliveryTimeSlot;
    deliveryMethod: DeliveryMethodsSlot;
    description?: string | undefined;
  },
  unknown
>;

export function DateAndMethodForm({
  dateAndMethodData,
  setDateAndMethodData,
  setIsDateAndMethodFormOpen,
  setIsDelivery,
}: {
  dateAndMethodData: DateAndMethodFormSchema;
  setDateAndMethodData: Dispatch<SetStateAction<DateAndMethodFormSchema>>;
  setIsDateAndMethodFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsDelivery: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<DateAndMethodFormSchema>({
    resolver: zodResolver(dateAndMethodFormSchema),
    defaultValues: {
      date: dateAndMethodData.date,
      time: dateAndMethodData.time,
      deliveryMethod: dateAndMethodData.deliveryMethod,
      description: dateAndMethodData.description,
    },
  });

  function onSubmit(values: DateAndMethodFormSchema) {
    setDateAndMethodData(values);
    setIsDateAndMethodFormOpen(false);
    console.log(values);
  }

  const globalValidationError = form.formState.errors.root?.message;

  const t = useTranslations("cart.cart_page.delivary_instructions");

  return (
    <motion.div
      key="detail-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="lg:py-6"
    >
      <H2 className="text-start text-2xl font-light md:mb-8 md:text-start">
        {t("title")}
      </H2>
      {globalValidationError && (
        <p className="mt-2 text-destructive">{globalValidationError}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <DateSelect
              control={form.control}
              errors={form.formState.errors.date}
            />
            <TimeSelect
              control={form.control}
              setValue={form.setValue}
              selectedDate={form.watch("date")}
              errors={form.formState.errors.time}
            />
            <MethodSelect
              control={form.control}
              errors={form.formState.errors.deliveryMethod}
              setIsDelivery={setIsDelivery}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.instructions")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[150px]"
                    placeholder={t("form.instructions_placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="float-right h-12 w-full sm:w-min">
            {t("form.button")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
