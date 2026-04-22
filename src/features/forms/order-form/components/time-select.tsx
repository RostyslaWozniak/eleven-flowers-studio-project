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
import type { Control, FieldError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import { type DeliveryFormSchema } from "../lib/schema/delivery-form.schema";
import { cn } from "@/lib/utils";
import {
  formItemClassName,
  labelClassName,
} from "../lib/constants/form-class-names";
import { isSlotDisabled } from "../lib/helpers/date";

export function TimeSelect({
  control,
  errors,
  selectedDate,
}: {
  control: Control<DeliveryFormSchema>;
  errors?: FieldError | undefined;
  selectedDate: Date;
}) {
  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.delivery_form.fields",
  );

  const tError = useTranslations("messages.error");

  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem className={cn(formItemClassName)}>
          <FormLabel className={cn(labelClassName)}>
            {tField("time.label")}
          </FormLabel>

          <FormControl>
            <Select
              name="time"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="h-9 rounded-full border border-primary text-base text-primary md:text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {DELIVERY_TIME_SLOTS.map((slot) => {
                  return (
                    <SelectItem
                      key={slot}
                      value={slot}
                      disabled={isSlotDisabled(slot, selectedDate)}
                    >
                      {slot}
                    </SelectItem>
                  );
                })}
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
