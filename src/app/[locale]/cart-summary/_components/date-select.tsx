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
import type { FieldError } from "react-hook-form";
import { type DeliveryFormControl } from "./date-and-method-form";
import { MAX_AVAILABLE_DAYS } from "@/lib/validation/date-and-method-form-schema";

export function DateSelect({
  control,
  errors,
}: {
  control: DeliveryFormControl;
  errors?: FieldError | undefined;
}) {
  const locale = useLocale();

  const t = useTranslations("cart.cart_page.delivary_instructions.form");

  const errorMessages = useTranslations("messages.error");

  const formatter = new Intl.DateTimeFormat(locale);
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="">
          <div className="flex h-3 items-center">
            <FormLabel>{t("date")}</FormLabel>
            {errors && (
              <span className="ml-2 text-xs text-destructive">
                ({errorMessages(errors.message)})
              </span>
            )}
          </div>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full border-2 px-3 text-base text-primary md:text-lg">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatter.format(field.value)}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  lang="pl"
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    // Only update the date if a new date is selected
                    if (
                      date &&
                      date.toDateString() !== field.value.toDateString()
                    ) {
                      field.onChange(date);
                    }
                  }}
                  initialFocus
                  fromDate={new Date()}
                  toDate={
                    // set max range up to MAX_AVAILABLE_DAYS
                    new Date(
                      new Date().setDate(
                        new Date().getDate() + MAX_AVAILABLE_DAYS,
                      ),
                    )
                  }
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
