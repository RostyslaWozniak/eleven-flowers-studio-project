"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  recipientFormSchema,
  type RecipientFormSchema,
} from "../lib/schema/recipient-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { H2 } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import { ChevronRightIcon } from "lucide-react";

type RecipientDataFormProps = {
  values: RecipientFormSchema;
  setValues: React.Dispatch<React.SetStateAction<RecipientFormSchema>>;
  onNext: () => void;
};
export function RecipientDataForm({
  values,
  setValues,
  onNext,
}: RecipientDataFormProps) {
  const form = useForm<RecipientFormSchema>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: values,
  });

  function onSubmit(values: RecipientFormSchema) {
    setValues(values);
    onNext();
  }

  const t = useTranslations("pages.cart_summary.forms.delivery.recipient_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.recipient_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  const tError = useTranslations("messages.error");

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
                      autoComplete="name"
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
                      autoComplete="tel"
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
            name="flowerMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tField("message.label")}</FormLabel>

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
          <div className="flex justify-end">
            <LoadingButton
              loading={false}
              type="submit"
              size="md"
              variant="outline"
            >
              {tButtons("next")} <ChevronRightIcon />
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
}
