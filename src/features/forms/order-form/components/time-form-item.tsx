import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import {
  formItemClassName,
  labelClassName,
} from "../lib/constants/form-class-names";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { isSlotDisabled } from "../lib/helpers/date";

type TimeFormItemProps = {
  value: string | undefined;
  onChange: (time: string) => void;
  error?: string;
  selectedDate: Date | undefined;
};

export function TimeFormItem({
  value,
  onChange,
  error,
  selectedDate,
}: TimeFormItemProps) {
  const tField = useTranslations("pages.cart_summary.forms.shared.fields.time");
  const tError = useTranslations("messages.error");
  return (
    <FormItem className={cn(formItemClassName)}>
      <FormLabel className={cn(labelClassName)}>{tField("label")}</FormLabel>

      <FormControl>
        <Select name="time" value={value} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              "h-9 rounded-full border border-primary text-sm text-muted-foreground",
              {
                "text-base text-primary": value,
              },
            )}
          >
            <SelectValue placeholder={tField("placeholder")} />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            {DELIVERY_TIME_SLOTS.map((slot) => {
              return (
                <SelectItem
                  key={slot}
                  value={slot}
                  disabled={selectedDate && isSlotDisabled(slot, selectedDate)}
                >
                  {slot}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FormControl>
      {error && (
        <span className="absolute text-xs text-destructive">
          ({tError(error)})
        </span>
      )}
    </FormItem>
  );
}
