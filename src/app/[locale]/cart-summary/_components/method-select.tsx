import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DELIVERY_METHODS } from "@/lib/validation/date-and-method-form-schema";
import { useTranslations } from "next-intl";
import type { Dispatch, SetStateAction } from "react";
import type { FieldError } from "react-hook-form";
import { type DeliveryFormControl } from "./date-and-method-form";

export function MethodSelect({
  control,
  errors,
  setIsDelivery,
}: {
  control: DeliveryFormControl;
  errors?: FieldError | undefined;
  setIsDelivery: Dispatch<SetStateAction<boolean>>;
}) {
  return null;
  const t = useTranslations("cart.cart_page.delivary_instructions.form");

  // const errorMessages = useTranslations("messages.error");
  return (
    <FormField
      control={control}
      name="deliveryMethod"
      render={({ field }) => (
        <FormItem>
          <div className="flex h-3 items-center">
            <FormLabel>Method</FormLabel>
            {errors && (
              <span className="ml-2 text-xs text-destructive">
                ({errors.message})
              </span>
            )}
          </div>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                console.log(value);
                setIsDelivery(value === "delivery");
              }}
            >
              <SelectTrigger className="h-10 rounded-full border-2 border-primary text-base text-primary md:text-lg">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {DELIVERY_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {t(`methods.${method}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
