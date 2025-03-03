"use client";
import { toast } from "sonner";
import { type Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { api } from "@/trpc/react";
import { useCart } from "@/context/cart-context";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import {
  orderingFormSchema,
  type OrderingFormSchema,
} from "@/lib/validation/ordering-form-schema";
import { type RecipientFormSchema } from "@/lib/validation/recipient-form-schema";
import { DateSelect } from "./date-select";
import { TimeSelect } from "./time-select";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export type OrderingFormControl = Control<{
  email: string;
  date: Date;
  time: "10:00-13:00" | "13:00-17:00" | "17:00-20:00";
  name?: string | undefined;
  phone?: string | undefined;
  description?: string | undefined;
}>;

export default function OrderingForm({
  recipientFormData,
  setIsRecipientFormOpen,
}: {
  recipientFormData: RecipientFormSchema;
  setIsRecipientFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isFormPending, setIsFormPending] = useState(false);

  const { setCartItems } = useCart();

  const t = useTranslations("cart.cart_page.forms.ordering");
  const tLabel = useTranslations("cart.cart_page.forms.ordering.labels");
  const tPlaceholder = useTranslations(
    "cart.cart_page.forms.ordering.placeholders",
  );
  const tError = useTranslations("messages.error");

  const form = useForm<OrderingFormSchema>({
    resolver: zodResolver(orderingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: new Date(),
      time: undefined,
      description: "",
      // name: "zamawiający_name",
      // phone: "zamawiający_phone",
      // email: "zamawiajacy@email.com",
      // date: new Date(),
      // time: undefined,
      // description: "",
    },
  });
  const router = useRouter();

  const { mutate: createOrderWithDelivery } =
    api.public.order.createWithDetails.useMutation({
      onSuccess: () => {
        router.push("/payment");
        setCartItems([]);
      },
      onError: ({ message }) => {
        toast.error(tError("title"), {
          className: "bg-destructive text-destructive-foreground",
          position: "top-right",
          description: tError(message),
        });
      },
    });
  function onSubmit(values: OrderingFormSchema) {
    setIsFormPending(true);
    createOrderWithDelivery({
      recipientFormData,
      orderingFormData: values,
    });
  }

  return (
    <motion.div
      key="detail-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="lg:py-6"
    >
      <H2 className="text-start text-2xl font-light md:text-start">
        {t("title")}
      </H2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-7 py-2 lg:py-8"
        >
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
                    <span className="text-xs text-destructive">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tLabel("email")}</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder={tPlaceholder("email")}
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <DateSelect
              control={form.control}
              errors={form.formState.errors.date}
            />
            <TimeSelect
              control={form.control}
              errors={form.formState.errors.time}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tLabel("instructions")}</FormLabel>

                <FormControl>
                  <Textarea
                    name="description"
                    className="min-h-[150px]"
                    placeholder={tPlaceholder("instructions")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {form.formState.errors.description && (
                  <span className="absolute text-xs text-destructive">
                    ({tError(form.formState.errors.description.message)})
                  </span>
                )}
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              className="w-12 border-none md:w-min"
              onClick={() => setIsRecipientFormOpen(true)}
            >
              <ArrowLeft />
              <span className="hidden md:inline"> {t("button_go_back")}</span>
            </Button>

            <LoadingButton
              loading={isFormPending}
              className="float-right h-12"
              size="lg"
            >
              {t("button_payment")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
