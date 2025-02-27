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
import { type OrderingFormControl } from "./ordering-form";

export function DateSelect({
  control,
  errors,
}: {
  control: OrderingFormControl;
  errors?: FieldError | undefined;
}) {
  const locale = useLocale();

  const tLabel = useTranslations("cart.cart_page.forms.ordering.labels");

  const tError = useTranslations("messages.error");

  const formatter = new Intl.DateTimeFormat(locale);
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{tLabel("date")}</FormLabel>

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
