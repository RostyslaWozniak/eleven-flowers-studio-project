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
import {
  DELIVERY_TIME_SLOTS,
  isTimeSlotDisabled,
} from "@/lib/validation/date-and-method-form-schema";
import { useEffect, useState } from "react";
import type { FieldError } from "react-hook-form";
import { type DeliveryFormControl } from "./date-and-method-form";
import { useTranslations } from "next-intl";

export function TimeSelect({
  control,
  selectedDate,
  errors,
}: {
  control: DeliveryFormControl;
  selectedDate: Date;
  errors?: FieldError | undefined;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every minute

    return () => clearInterval(interval);
  }, []);

  const t = useTranslations("cart.cart_page.delivary_instructions.form");

  const errorMessages = useTranslations("messages.error");
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <div className="flex h-3 items-center">
            <FormLabel>{t("time")}</FormLabel>
            {errors && (
              <span className="ml-2 text-xs text-destructive">
                {" "}
                ({errorMessages(errors.message)})
              </span>
            )}
          </div>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-10 rounded-full border-2 border-primary text-base text-primary md:text-lg">
                <SelectValue placeholder={t("select_time")} />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {DELIVERY_TIME_SLOTS.map((slot) => (
                  <SelectItem
                    key={slot}
                    value={slot}
                    disabled={isTimeSlotDisabled(
                      slot,
                      selectedDate,
                      currentTime,
                    )}
                  >
                    {slot}
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
