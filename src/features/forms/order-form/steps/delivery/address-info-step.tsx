import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { getDeliveryPriceInCents } from "@/lib/utils/delivery";
import { useEffect, useMemo } from "react";
import { deliveryFormSchema, type DeliveryFormSchema } from "../../lib/schema";
import { cn, formatPrice } from "@/lib/utils";
import {
  formErrorClassName,
  formItemClassName,
  labelClassName,
} from "../../lib/constants/form-class-names";
import { DateFormItem } from "../../components/date-form-item";
import { TimeFormItem } from "../../components/time-form-item";

type DeliveryInfoFormProps = {
  values: DeliveryFormSchema;
  setValues: React.Dispatch<React.SetStateAction<DeliveryFormSchema>>;
  onNext: () => void;
  onPrev: () => void;
};

export function DeliveryInfoForm({
  values,
  setValues,
  onNext,
  onPrev,
}: DeliveryInfoFormProps) {
  const { setDeliveryPrice, totalPrice } = useCart();
  const form = useForm<DeliveryFormSchema>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      date: values.date ? new Date(values.date) : undefined,
      time: values.time,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
    },
  });

  function onSubmit(values: DeliveryFormSchema) {
    setValues(values);
    onNext();
  }

  const t = useTranslations("pages.cart_summary.forms.delivery.delivery_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.delivery_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  const tError = useTranslations("messages.error");

  const postalCode = form.watch("postalCode");

  const deliveryPrice = useMemo(() => {
    if (postalCode && /^\d{2}-\d{3}$/.test(postalCode)) {
      const price = getDeliveryPriceInCents(totalPrice, postalCode);

      return price;
    }
    return null;
  }, [postalCode, totalPrice]);

  const selectedDate = form.watch("date");

  useEffect(() => {
    if (deliveryPrice == null) return;
    setDeliveryPrice(deliveryPrice);
  }, [deliveryPrice, setDeliveryPrice]);

  return (
    <>
      <H2 className="text-start font-light md:mb-8 md:text-start">
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
                  <DateFormItem
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.date?.message}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <TimeFormItem
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.time?.message}
                    selectedDate={selectedDate}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className={cn(formItemClassName)}>
                  <FormLabel className={cn(labelClassName)}>
                    {tField("address.label")}
                  </FormLabel>

                  <FormControl>
                    <Input
                      name="address"
                      type="text"
                      placeholder={tField("address.placeholder")}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  {form.formState.errors.address && (
                    <span className={cn(formErrorClassName)}>
                      ({tError(form.formState.errors.address.message)})
                    </span>
                  )}
                </FormItem>
              )}
            />
            <div className="grid gap-x-4 gap-y-5 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className={cn(formItemClassName)}>
                    <FormLabel className={cn(labelClassName)}>
                      {tField("city.label")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        name="city"
                        type="text"
                        placeholder={tField("city.placeholder")}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    {form.formState.errors.city && (
                      <span className={cn(formErrorClassName)}>
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
                  <FormItem className={cn(formItemClassName)}>
                    <FormLabel className={cn(labelClassName)}>
                      {tField("postal_code.label")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        name="postalCode"
                        autoComplete="postal-code"
                        placeholder={tField("postal_code.placeholder")}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    {deliveryPrice !== null &&
                      /^\d{2}-\d{3}$/.test(postalCode) && (
                        <div className="mt-1 rounded-sm border border-slate-200 bg-card px-3 py-1">
                          <p className="text-xs font-medium text-primary">
                            {tField("postal_code.delivery_fee")}:{" "}
                            {formatPrice(deliveryPrice)}
                          </p>
                        </div>
                      )}
                    {form.formState.errors.postalCode && (
                      <span className={cn(formErrorClassName)}>
                        ({tError(form.formState.errors.postalCode.message)})
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between pt-3">
              <LoadingButton
                onClick={onPrev}
                loading={false}
                type="button"
                size="md"
                variant="outline"
              >
                <ChevronLeftIcon />
                {tButtons("prev")}
              </LoadingButton>
              <LoadingButton
                loading={false}
                type="submit"
                size="md"
                variant="outline"
              >
                {tButtons("next")} <ChevronRightIcon />
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
