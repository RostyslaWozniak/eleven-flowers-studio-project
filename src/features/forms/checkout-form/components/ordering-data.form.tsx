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
import {
  orderingFormSchema,
  type OrderingFormSchema,
} from "../lib/schema/ordering-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect } from "react";

type OrderingDataFormProps = {
  values: OrderingFormSchema;
  isPending: boolean;
  setValues: React.Dispatch<React.SetStateAction<OrderingFormSchema>>;
  onPrev: () => void;
  onSubmitForm: (orderingVal: OrderingFormSchema) => void;
};

export function OrderingDataForm({
  values,
  isPending,
  setValues,
  onPrev,
  onSubmitForm,
}: OrderingDataFormProps) {
  const form = useForm<OrderingFormSchema>({
    resolver: zodResolver(orderingFormSchema),
    defaultValues: values,
  });

  const t = useTranslations("pages.cart_summary.forms.delivery.ordering_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.ordering_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  const tError = useTranslations("messages.error");

  function onSubmit(values: OrderingFormSchema) {
    setValues(values);
    onSubmitForm(values);
  }

  useEffect(() => {
    console.log(form.formState);
  }, [form]);

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
                <FormItem>
                  <FormLabel>{tField("name.label")}</FormLabel>

                  <FormControl>
                    <Input
                      name="name"
                      type="text"
                      placeholder={tField("name.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  {form.formState.errors.name && (
                    <span className="absolute text-xs text-destructive">
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
                <FormItem>
                  <FormLabel>{tField("phone.label")}</FormLabel>

                  <FormControl>
                    <Input
                      name="phone"
                      type="text"
                      placeholder={tField("phone.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  {form.formState.errors.phone && (
                    <span className="absolute text-xs text-destructive">
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
              <FormItem>
                <FormLabel>{tField("email.label")}</FormLabel>

                <FormControl>
                  <Input
                    name="email"
                    type="text"
                    placeholder={tField("email.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                {form.formState.errors.email && (
                  <span className="absolute text-xs text-destructive">
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
              <FormItem>
                <FormLabel>{tField("description.label")}</FormLabel>

                <FormControl>
                  <Textarea
                    name="flowerMedescriptionssage"
                    className="min-h-[120px]"
                    placeholder={tField("description.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {form.formState.errors.description && (
                  <span className="text-xs text-destructive">
                    ({tError(form.formState.errors.description.message)})
                  </span>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-between">
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
