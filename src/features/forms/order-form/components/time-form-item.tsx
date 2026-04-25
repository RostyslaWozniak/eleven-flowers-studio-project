import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { DELIVERY_TIME_SLOTS } from "@/lib/utils/delivery";
import {
  formItemClassName,
  labelClassName,
} from "../lib/constants/form-class-names";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { isSlotDisabled } from "../lib/helpers/date";
import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { useState } from "react";
import { ClockIcon } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const tField = useTranslations("pages.cart_summary.forms.shared.fields.time");
  const tError = useTranslations("messages.error");
  return (
    <FormItem className={cn(formItemClassName)}>
      <FormLabel className={cn(labelClassName)}>{tField("label")}</FormLabel>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex h-9 w-full cursor-pointer items-center justify-start rounded-full border px-3 text-sm text-muted-foreground",
          {
            "text-base text-primary": value,
          },
        )}
      >
        <ClockIcon className="mr-2 h-4 w-4" />
        {value ?? tField("placeholder")}
      </button>

      <FormControl>
        <DialogWrapper
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={tField("placeholder")}
          className="w-80"
        >
          <div className="grid gap-y-2">
            {DELIVERY_TIME_SLOTS.map((slot) => (
              <Button
                key={slot}
                type="button"
                size="md"
                className=""
                variant={slot === value ? "outline" : "secondary"}
                onClick={() => {
                  onChange(slot);
                  setIsOpen(false);
                }}
                value={slot}
                disabled={selectedDate && isSlotDisabled(slot, selectedDate)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </DialogWrapper>
      </FormControl>
      {error && (
        <span className="absolute text-xs text-destructive">
          ({tError(error)})
        </span>
      )}
    </FormItem>
  );
}
