"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  subscribeFormSchema,
  type SubscribeFormSchema,
} from "@/lib/validation/subscribe-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Text } from "../ui/typography";
import LoadingButton from "../loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function SubscribeForm() {
  const t = useTranslations("footer");
  const tError = useTranslations("messages.error");
  const tSuccess = useTranslations("messages.success");

  const { mutate, isPending } = api.public.subscribers.subscribe.useMutation({
    onSuccess: () => {
      toast.success(tSuccess("title"));
      form.reset();
    },
    onError: ({ message }) => {
      toast.info(tError(message));
      form.reset();
    },
  });

  const form = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: SubscribeFormSchema) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Text size="lg" variant="muted" className="">
                  {t("newsletter.label")}
                </Text>
              </FormLabel>
              <FormDescription>{t("newsletter.description")}</FormDescription>
              {/* <FormMessage /> */}
              {form.formState.errors.email && (
                <span className="text-xs text-destructive">
                  {tError(form.formState.errors.email.message)}
                </span>
              )}
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <FormControl>
                  <Input
                    placeholder={t("newsletter.placeholder")}
                    className="h-12 w-full rounded-full pl-4 sm:h-10"
                    {...field}
                  />
                </FormControl>
                <LoadingButton
                  type="submit"
                  loading={isPending}
                  size="md"
                  variant="default"
                  className="h-12 w-full sm:h-10 sm:w-min"
                >
                  {t("newsletter.button")}
                </LoadingButton>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
