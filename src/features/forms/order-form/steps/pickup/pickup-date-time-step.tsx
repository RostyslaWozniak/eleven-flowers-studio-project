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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import {
  pickupDatAndTimeFormSchema,
  type PickupDatAndTimeFormSchema,
} from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasNoAvailableSlots, isSlotDisabled } from "../../lib/helpers/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import LoadingButton from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { getCalendarLocale } from "../../lib/helpers/locale";
import { H2 } from "@/components/ui/typography";

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
    defaultValues: { date: new Date(values.date), time: values.time },
  });
  const locale = useLocale();

  const t = useTranslations("pages.cart_summary.forms.pickup.date_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.pickup.date_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");

  const tError = useTranslations("messages.error");

  const formatter = new Intl.DateTimeFormat(locale);

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
                  <FormItem className={cn(formItemClassName)}>
                    <FormLabel className={cn(labelClassName)}>
                      {tField("date.label")}
                    </FormLabel>

                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="flex h-9 w-full cursor-pointer items-center justify-start rounded-full border px-3 text-base text-primary md:text-lg">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatter.format(field.value)}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            lang="pl"
                            locale={getCalendarLocale(locale)}
                            mode="single"
                            selected={field.value}
                            disabled={hasNoAvailableSlots}
                            onSelect={(date) => {
                              // Only update the date if a new date is selected
                              if (
                                date &&
                                date?.toDateString() !==
                                  field.value?.toDateString()
                              ) {
                                const utcDate = new Date(
                                  Date.UTC(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    0,
                                  ),
                                );

                                field.onChange(utcDate);
                              }
                            }}
                            fromDate={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {form.formState.errors.date && (
                      <span className="absolute text-xs text-destructive">
                        ({tError(form.formState.errors.date.message)})
                      </span>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className={cn(formItemClassName)}>
                    <FormLabel className={cn(labelClassName)}>
                      {tField("time.label")}
                    </FormLabel>

                    <FormControl>
                      <Select
                        name="time"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 rounded-full border border-primary text-base text-primary md:text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                          {DELIVERY_TIME_SLOTS.map((slot) => {
                            return (
                              <SelectItem
                                key={slot}
                                value={slot}
                                disabled={isSlotDisabled(slot, selectedDate)}
                              >
                                {slot}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.time && (
                      <span className="absolute text-xs text-destructive">
                        ({tError(form.formState.errors.time.message)})
                      </span>
                    )}
                  </FormItem>
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
