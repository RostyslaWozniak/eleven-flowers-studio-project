"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  formItemClassName,
  labelClassName,
} from "../lib/constants/form-class-names";
import { Calendar } from "@/components/ui/calendar";
import { getCalendarLocale } from "../lib/helpers/locale";
import { hasNoAvailableSlots } from "../lib/helpers/date";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type DateFormItemProps = {
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: string;
};

export function DateFormItem({ value, onChange, error }: DateFormItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const tField = useTranslations("pages.cart_summary.forms.shared.fields.date");
  const tError = useTranslations("messages.error");

  const formatter = new Intl.DateTimeFormat(locale);
  return (
    <FormItem className={cn(formItemClassName)}>
      <FormLabel className={cn(labelClassName)}>{tField("label")}</FormLabel>

      <FormControl>
        <div>
          <Button
            variant="outline"
            type="button"
            size="md"
            className={cn(
              "flex w-full cursor-pointer items-center justify-start rounded-full border px-3 text-sm text-muted-foreground",
              {
                "text-sm text-primary": value,
              },
            )}
            onClick={() => setIsOpen(true)}
          >
            <div className="flex flex-grow items-center gap-x-2">
              <CalendarIcon />
              {value ? formatter.format(value) : tField("placeholder")}
            </div>
            <ChevronDownIcon />
          </Button>
          <DialogWrapper
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={tField("placeholder")}
          >
            <div>
              <Calendar
                lang="pl"
                locale={getCalendarLocale(locale)}
                mode="single"
                defaultMonth={value}
                selected={value}
                disabled={hasNoAvailableSlots}
                onSelect={(date) => {
                  // Only update the date if a new date is selected
                  if (date && date?.toDateString() !== value?.toDateString()) {
                    const utcDate = new Date(
                      Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        0,
                      ),
                    );

                    onChange(utcDate);
                  }
                  setIsOpen(false);
                }}
                fromDate={new Date()}
              />
            </div>
          </DialogWrapper>
        </div>
      </FormControl>
      {error && (
        <span className="absolute text-xs text-destructive">
          ({tError(error)})
        </span>
      )}
    </FormItem>
  );
}
