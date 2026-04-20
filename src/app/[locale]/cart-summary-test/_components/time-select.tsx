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
import type { FieldError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { type OrderingFormControl } from "./ordering-form";
import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";

export function TimeSelect({
  control,
  errors,
}: {
  control: OrderingFormControl;
  errors?: FieldError | undefined;
}) {
  const tLabel = useTranslations("cart.cart_page.forms.ordering.labels");
  const tPlaceholder = useTranslations(
    "cart.cart_page.forms.ordering.placeholders",
  );
  const tError = useTranslations("messages.error");
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{tLabel("time")}</FormLabel>

          <FormControl>
            <Select
              name="time"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="h-9 rounded-full border border-primary text-base text-primary md:text-lg">
                <SelectValue placeholder={tPlaceholder("time")} />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {DELIVERY_TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {errors && (
            <span className="absolute text-xs text-destructive">
              ({tError(errors.message)})
            </span>
          )}
        </FormItem>
      )}
    />
  );
}
