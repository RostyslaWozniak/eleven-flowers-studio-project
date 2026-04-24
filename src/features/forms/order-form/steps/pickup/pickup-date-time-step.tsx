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
import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  pickupDatAndTimeFormSchema,
  type PickupDatAndTimeFormSchema,
} from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { H2 } from "@/components/ui/typography";
import { DateFormItem } from "../../components/date-form-item";
import { TimeFormItem } from "../../components/time-form-item";

type PickupDateAndTimeStepProps = {
  values: PickupDatAndTimeFormSchema;
  setValues: React.Dispatch<React.SetStateAction<PickupDatAndTimeFormSchema>>;
  onNext: () => void;
};

export function PickupDateAndTimeStep({
  values,
  setValues,
  onNext,
}: PickupDateAndTimeStepProps) {
  const form = useForm<PickupDatAndTimeFormSchema>({
    resolver: zodResolver(pickupDatAndTimeFormSchema),
    defaultValues: {
      date: values.date ? new Date(values?.date) : undefined,
      time: values.time,
    },
  });

  const t = useTranslations("pages.cart_summary.forms.pickup.date_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.pickup.date_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");

  const tError = useTranslations("messages.error");

  function onSubmit(values: PickupDatAndTimeFormSchema) {
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
              name="flowerMessage"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormLabel className={cn(labelClassName)}>
                    {tField("message.label")}
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      name="flowerMessage"
                      className="min-h-[150px]"
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
