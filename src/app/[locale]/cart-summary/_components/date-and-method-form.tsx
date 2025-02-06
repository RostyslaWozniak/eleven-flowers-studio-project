"use client";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { H2 } from "@/components/ui/typography";
import {
  type DateAndMethodFormSchema,
  dateAndMethodFormSchema,
  deliveryMethods,
  deliveryTimeArray,
} from "@/lib/validation/date-and-method-form-schema";
import { useLocale, useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";

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
  const t = useTranslations("Checkout.delivery");

  const locale = useLocale();

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
  }

  const globalValidationError = form.formState.errors.root?.message;
  const formatter = new Intl.DateTimeFormat(locale);
  return (
    <motion.div
      key="detail-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="lg:py-6"
    >
      <H2 className="text-start text-2xl font-light md:text-start">
        Delivery details
      </H2>
      {globalValidationError && (
        <p className="mt-2 text-destructive">{globalValidationError}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <div className="flex h-3 items-center">
                    <FormLabel>Date</FormLabel>
                    {form.formState.errors.date && (
                      <span className="ml-2 text-xs text-destructive">
                        ({form.formState.errors.date.message})
                      </span>
                    )}
                  </div>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full border-2 px-3 text-base text-primary md:text-lg">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatter.format(field.value)}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          lang="pl"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-3 items-center">
                    <FormLabel>Time</FormLabel>
                    {form.formState.errors.time && (
                      <span className="ml-2 text-xs text-destructive">
                        {" "}
                        ({form.formState.errors.time.message})
                      </span>
                    )}
                  </div>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-full border-2 border-primary text-base text-primary md:text-lg">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent className="rounded-sm">
                        {deliveryTimeArray.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryMethod"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-3 items-center">
                    <FormLabel>Method</FormLabel>
                    {form.formState.errors.deliveryMethod && (
                      <span className="ml-2 text-xs text-destructive">
                        {" "}
                        ({form.formState.errors.deliveryMethod.message})
                      </span>
                    )}
                  </div>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log(value);
                        setIsDelivery(value === "delivery");
                      }}
                    >
                      <SelectTrigger className="h-10 rounded-full border-2 border-primary text-base text-primary md:text-lg">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                      <SelectContent className="rounded-sm">
                        {deliveryMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {t(`methods.${method}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Details</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[150px]"
                    placeholder="Add any special instructions or notes here"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="float-right h-12 md:w-36">
            Submit
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
