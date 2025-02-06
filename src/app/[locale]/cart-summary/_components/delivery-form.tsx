"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";
import { type DateAndMethodFormSchema } from "@/lib/validation/date-and-method-form-schema";
import { redirect } from "@/i18n/routing";
import {
  type DeliveryFormSchema,
  deliveryFormSchema,
} from "@/lib/validation/delivery-form-schema";

export default function DeliveryForm({
  dateAndMethodData,
}: {
  dateAndMethodData: DateAndMethodFormSchema;
}) {
  const tFormErrorMessages = useTranslations("Form");
  const t = useTranslations("Checkout.details");

  const locale = useLocale();

  const { storedCartId } = useCart();

  const form = useForm<DeliveryFormSchema>({
    resolver: zodResolver(deliveryFormSchema(tFormErrorMessages)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  function onSubmit(values: DeliveryFormSchema) {
    if (!storedCartId) {
      toast.error("No Cart found!", {
        className: "bg-destructive  text-destructive-foreground",
        position: "top-right",
      });
      return redirect({ locale, href: "/products" });
    }
    try {
      const data = {
        cartId: storedCartId,
        locale: locale,
        dateAndMethodData: dateAndMethodData,
        addressDetails: values,
      };

      console.log(data);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
        className: "bg-destructive text-destructive-foreground",
      });
    }
  }

  return (
    <motion.div
      key="detail-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="lg:py-6"
    >
      <H2 className="text-start text-2xl font-light md:text-start">
        {t("title")}
      </H2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-4 py-8"
        >
          <div className="grid grid-cols-12 gap-2 md:gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.firstName")}</FormLabel>
                      {form.formState.errors.firstName && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.firstName.message})
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.lastName")}</FormLabel>
                      {form.formState.errors.lastName && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.lastName.message})
                        </span>
                      )}
                    </div>

                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-3 items-center">
                  <FormLabel>{t("form.email")}</FormLabel>
                  {form.formState.errors.email && (
                    <span className="ml-2 text-xs text-destructive">
                      {" "}
                      ({form.formState.errors.email.message})
                    </span>
                  )}
                </div>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-3 items-center">
                  <FormLabel>{t("form.address")}</FormLabel>
                  {form.formState.errors.address && (
                    <span className="ml-2 text-xs text-destructive">
                      {" "}
                      ({form.formState.errors.address.message})
                    </span>
                  )}
                </div>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4 pb-3">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.city")}</FormLabel>
                      {form.formState.errors.city && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.city.message})
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.postalCode")}</FormLabel>
                      {form.formState.errors.postalCode && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.postalCode.message})
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className="float-right h-12 w-full sm:w-min sm:max-w-sm"
            size="lg"
            type="submit"
          >
            {t("form.button")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
