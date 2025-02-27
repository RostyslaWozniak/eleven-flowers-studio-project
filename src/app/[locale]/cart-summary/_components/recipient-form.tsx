"use client";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { H2 } from "@/components/ui/typography";
import {
  type RecipientFormSchema,
  recipientFormSchema,
} from "@/lib/validation/recipient-form-schema";
import { type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";

export function RecipientForm({
  recipientFormData,
  setRecipientFormData,
  setIsRecipientFormOpen,
}: {
  recipientFormData: RecipientFormSchema;
  setRecipientFormData: Dispatch<SetStateAction<RecipientFormSchema>>;
  setIsRecipientFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<RecipientFormSchema>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      name: recipientFormData.name,
      phone: recipientFormData.phone,
      address: recipientFormData.address,
      city: recipientFormData.city,
      postalCode: recipientFormData.postalCode,
      flowerMessage: recipientFormData.flowerMessage,
    },
  });

  function onSubmit(values: RecipientFormSchema) {
    setRecipientFormData(values);
    setIsRecipientFormOpen(false);
    console.log(values);
  }

  const globalValidationError = form.formState.errors.root?.message;

  const t = useTranslations("cart.cart_page.forms.recipient");
  const tLabel = useTranslations("cart.cart_page.forms.recipient.labels");
  const tPlaceholder = useTranslations(
    "cart.cart_page.forms.recipient.placeholders",
  );
  const tError = useTranslations("messages.error");

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div className="grid gap-x-4 gap-y-5 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tLabel("name")}</FormLabel>

                  <FormControl>
                    <Input
                      name="name"
                      placeholder={tPlaceholder("name")}
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
                  <FormLabel>{tLabel("phone")}</FormLabel>

                  <FormControl>
                    <Input
                      name="phone"
                      placeholder={tPlaceholder("phone")}
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tLabel("address")}</FormLabel>

                <FormControl>
                  <Input
                    name="address"
                    placeholder={tPlaceholder("address")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {form.formState.errors.address && (
                  <span className="absolute text-xs text-destructive">
                    ({tError(form.formState.errors.address.message)})
                  </span>
                )}
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tLabel("city")}</FormLabel>

                  <FormControl>
                    <Input
                      name="city"
                      placeholder={tPlaceholder("city")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.formState.errors.city && (
                    <span className="absolute text-xs text-destructive">
                      ({tError(form.formState.errors.city.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tLabel("postal_code")}</FormLabel>

                  <FormControl>
                    <Input
                      name="postalCode"
                      placeholder={tPlaceholder("postal_code")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.formState.errors.postalCode && (
                    <span className="absolute text-xs text-destructive">
                      ({tError(form.formState.errors.postalCode.message)})
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
                <FormLabel>{tLabel("flower_message")}</FormLabel>

                <FormControl>
                  <Textarea
                    name="flowerMessage"
                    className="min-h-[150px]"
                    placeholder={tPlaceholder("flower_message")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {form.formState.errors.flowerMessage ? (
                  <span className="text-xs text-destructive">
                    ({tError(form.formState.errors.flowerMessage.message)})
                  </span>
                ) : (
                  <FormDescription className="text-xs"> </FormDescription>
                )}
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            loading={false}
            className="float-right h-12"
            size="lg"
          >
            {t("button_next")}
          </LoadingButton>
        </form>
      </Form>
    </motion.div>
  );
}
