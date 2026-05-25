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
import LoadingButton from "../loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { ChevronRightIcon } from "lucide-react";

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
                <h4 className="mb-2 text-lg font-bold text-primary/80">
                  {t("newsletter.label")}
                </h4>
                <FormDescription className="leading-5">
                  {t("newsletter.description")}
                </FormDescription>
              </FormLabel>

              <div className="relative flex flex-col items-center gap-3 sm:flex-row">
                <FormControl>
                  <Input
                    placeholder={t("newsletter.placeholder")}
                    className="h-10 w-full rounded-full pl-4 pr-20"
                    {...field}
                  />
                </FormControl>
                <LoadingButton
                  type="submit"
                  loading={isPending}
                  size="md"
                  variant="default"
                  className="absolute bottom-0.5 right-0.5 top-0.5 h-auto"
                >
                  {/* {t("newsletter.button")} */}
                  <ChevronRightIcon className="!h-6 !w-6" />
                </LoadingButton>
              </div>
              {/* <FormMessage /> */}
              {form.formState.errors.email && (
                <span className="text-xs text-destructive">
                  {tError(form.formState.errors.email.message)}
                </span>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
