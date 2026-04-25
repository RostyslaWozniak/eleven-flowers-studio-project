"use client";

import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { H2 } from "@/components/ui/typography";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon } from "lucide-react";
import { ordererFormSchema, type OrdererFormSchema } from "../../lib/schema";
import { cn } from "@/lib/utils";
import {
  formErrorClassName,
  formItemClassName,
  labelClassName,
} from "../../lib/constants/form-class-names";

type OrderingInfoFormProps = {
  values: OrdererFormSchema;
  isPending: boolean;
  setValues: React.Dispatch<React.SetStateAction<OrdererFormSchema>>;
  onPrev: () => void;
  onSubmitForm: (orderingVal: OrdererFormSchema) => void;
};

export function OrderingInfoForm({
  values,
  isPending,
  setValues,
  onPrev,
  onSubmitForm,
}: OrderingInfoFormProps) {
  const form = useForm<OrdererFormSchema>({
    resolver: zodResolver(ordererFormSchema),
    defaultValues: values,
  });

  const t = useTranslations("pages.cart_summary.forms.delivery.ordering_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.ordering_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  const tError = useTranslations("messages.error");

  function onSubmit(values: OrdererFormSchema) {
    setValues(values);
    onSubmitForm(values);
  }

  return (
    <>
      <H2 className="text-start font-light md:mb-8 md:text-start">
        {t("title")}
      </H2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div className="grid gap-x-4 gap-y-5 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormLabel className={cn(labelClassName)}>
                    {tField("name.label")}
                  </FormLabel>

                  <FormControl>
                    <Input
                      name="name"
                      autoComplete="name"
                      type="text"
                      placeholder={tField("name.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  {form.formState.errors.name && (
                    <span className={cn(formErrorClassName)}>
                      ({tError(form.formState.errors.name.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormLabel className={cn(labelClassName)}>
                    {tField("phone.label")}
                  </FormLabel>

                  <FormControl>
                    <Input
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      placeholder={tField("phone.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  {form.formState.errors.phone && (
                    <span className={cn(formErrorClassName)}>
                      ({tError(form.formState.errors.phone.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={cn(formItemClassName)}>
                <FormLabel className={cn(labelClassName)}>
                  {tField("email.label")}
                </FormLabel>

                <FormControl>
                  <Input
                    autoComplete="email"
                    name="email"
                    type="email"
                    placeholder={tField("email.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                {form.formState.errors.email && (
                  <span className={cn(formErrorClassName)}>
                    ({tError(form.formState.errors.email.message)})
                  </span>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className={cn(formItemClassName)}>
                <FormLabel className={cn(labelClassName)}>
                  {tField("description.label")}
                </FormLabel>

                <FormControl>
                  <Textarea
                    name="flowerMessage"
                    className="min-h-[120px]"
                    placeholder={tField("description.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {form.formState.errors.description && (
                  <span className={cn(formErrorClassName)}>
                    ({tError(form.formState.errors.description.message)})
                  </span>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-3">
            <LoadingButton
              onClick={onPrev}
              loading={false}
              type="button"
              size="md"
              variant="outline"
            >
              <ChevronLeftIcon /> {tButtons("prev")}
            </LoadingButton>
            <LoadingButton
              loading={isPending}
              type="submit"
              size="md"
              variant="outline"
            >
              {tButtons("to_checkout")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
}
