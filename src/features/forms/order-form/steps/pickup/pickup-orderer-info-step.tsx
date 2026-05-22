import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  formErrorClassName,
  formItemClassName,
  labelClassName,
} from "../../lib/constants/form-class-names";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import {
  pickupOrdererFormSchema,
  type PickupOrdererFormSchema,
} from "../../lib/schema/pickup-orderer-form.schema";
import { type $Enums } from "@prisma/client";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PickupOrdererInfoStepProps = {
  values: PickupOrdererFormSchema;
  isPending: boolean;
  setValues: React.Dispatch<React.SetStateAction<PickupOrdererFormSchema>>;
  onPrev: () => void;
  onSubmitForm: (
    orderingVal: PickupOrdererFormSchema,
    paymentStatus: $Enums.PaymentStatus,
  ) => void;
};

export function PickupOrdererInfoStep({
  onPrev,
  values,
  setValues,
  onSubmitForm,
  isPending,
}: PickupOrdererInfoStepProps) {
  const form = useForm<PickupOrdererFormSchema>({
    resolver: zodResolver(pickupOrdererFormSchema),
    defaultValues: values,
  });

  const t = useTranslations("pages.cart_summary.forms.pickup.ordering_form");
  const tField = useTranslations(
    "pages.cart_summary.forms.pickup.ordering_form.fields",
  );
  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  const tError = useTranslations("messages.error");

  const watchPaymentStatus = form.watch("paymentStatus");
  function onSubmit(values: PickupOrdererFormSchema) {
    setValues(values);
    onSubmitForm(values, watchPaymentStatus);
  }

  return (
    <>
      <H2 className="text-start font-light md:mb-4 md:text-start">
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
                      autoComplete="name"
                      name="name"
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
                      autoComplete="tel"
                      name="phone"
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
                    name="email"
                    autoComplete="email"
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
            name="paymentStatus"
            render={({ field }) => (
              <FormItem className={cn(formItemClassName)}>
                <FormLabel className={cn(labelClassName)}>
                  {tField("payment_option.label")}
                </FormLabel>

                <FormControl>
                  <PaymentOptionSelect onChange={field.onChange} />
                </FormControl>
                {form.formState.errors.paymentStatus && (
                  <span className={cn(formErrorClassName)}>
                    ({tError(form.formState.errors.paymentStatus.message)})
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
              <ChevronLeftIcon />
              {tButtons("prev")}
            </LoadingButton>
            <LoadingButton
              loading={isPending}
              type="submit"
              size="md"
              variant="outline"
            >
              {watchPaymentStatus === "PENDING"
                ? tButtons("to_checkout")
                : tButtons("place_order")}
              <ChevronRightIcon />
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
}

function PaymentOptionSelect({
  onChange,
}: {
  onChange: (paymentStatus: "PENDING" | "PAID_ON_DELIVERY") => void;
}) {
  const tField = useTranslations(
    "pages.cart_summary.forms.pickup.ordering_form.fields",
  );
  return (
    <RadioGroup defaultValue="PENDING" className="flex">
      <FieldLabel htmlFor="PENDING">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{tField("payment_option.online")}</FieldTitle>
            {/* <FieldDescription>
              For individuals and small teams.
            </FieldDescription> */}
          </FieldContent>
          <RadioGroupItem
            value="PENDING"
            id="PENDING"
            onClick={() => onChange("PENDING")}
          />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="PAID_ON_DELIVERY">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{tField("payment_option.on_pickup")}</FieldTitle>
            {/* <FieldDescription>For growing businesses.</FieldDescription> */}
          </FieldContent>
          <RadioGroupItem
            onClick={() => onChange("PAID_ON_DELIVERY")}
            value="PAID_ON_DELIVERY"
            id="PAID_ON_DELIVERY"
          />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
