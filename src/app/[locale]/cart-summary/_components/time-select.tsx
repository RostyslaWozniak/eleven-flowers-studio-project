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
  type DateAndMethodFormSchema,
  DELIVERY_TIME_SLOTS,
  getClosestAvailableDateAndTime,
  isTimeSlotDisabled,
} from "@/lib/validation/date-and-method-form-schema";
import { useEffect, useState } from "react";
import type { FieldError, UseFormSetValue } from "react-hook-form";
import { type DeliveryFormControl } from "./date-and-method-form";

export function TimeSelect({
  control,
  setValue,
  selectedDate,
  errors,
}: {
  control: DeliveryFormControl;
  setValue: UseFormSetValue<DateAndMethodFormSchema>;
  selectedDate: Date;
  errors?: FieldError | undefined;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const { date, time } = getClosestAvailableDateAndTime(currentTime);
    console.log({ date, time });
    setCurrentTime(new Date(time));
    setValue("date", date);
    setValue("time", time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every minute

    return () => clearInterval(interval);
  }, []);
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <div className="flex h-3 items-center">
            <FormLabel>Time</FormLabel>
            {errors && (
              <span className="ml-2 text-xs text-destructive">
                {" "}
                ({errors.message})
              </span>
            )}
          </div>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-10 rounded-full border-2 border-primary text-base text-primary md:text-lg">
                <SelectValue placeholder="Select a time" />
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
