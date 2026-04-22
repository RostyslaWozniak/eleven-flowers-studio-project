import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Control, FieldError } from "react-hook-form";
import { type DeliveryFormSchema } from "../lib/schema/delivery-form.schema";
import { cn } from "@/lib/utils";
import {
  formItemClassName,
  labelClassName,
} from "../lib/constants/form-class-names";
import { hasNoAvailableSlots } from "../lib/helpers/date";

export function DateSelect({
  control,
  errors,
}: {
  control: Control<DeliveryFormSchema>;
  errors?: FieldError | undefined;
}) {
  const locale = useLocale();

  const tField = useTranslations(
    "pages.cart_summary.forms.delivery.delivery_form.fields",
  );

  const tError = useTranslations("messages.error");

  const formatter = new Intl.DateTimeFormat(locale);
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className={cn(formItemClassName)}>
          <FormLabel className={cn(labelClassName)}>
            {tField("date.label")}
          </FormLabel>

          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex h-9 w-full cursor-pointer items-center justify-start rounded-full border px-3 text-base text-primary md:text-lg">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatter.format(field.value)}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  lang="pl"
                  mode="single"
                  selected={field.value}
                  disabled={hasNoAvailableSlots}
                  onSelect={(date) => {
                    // Only update the date if a new date is selected
                    if (
                      date &&
                      date?.toDateString() !== field.value?.toDateString()
                    ) {
                      const utcDate = new Date(
                        Date.UTC(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          0,
                        ),
                      );

                      field.onChange(utcDate);
                    }
                  }}
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
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
