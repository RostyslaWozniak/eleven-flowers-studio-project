"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
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
          <button
            type="button"
            className={cn(
              "flex h-9 w-full cursor-pointer items-center justify-start rounded-full border px-3 text-sm text-muted-foreground",
              {
                "text-base text-primary": value,
              },
            )}
            onClick={() => setIsOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? formatter.format(value) : tField("placeholder")}
          </button>
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
                // disabled={(date) => {
                //   console.log(date);
                //   return false;
                // }}
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
// export function DateFormItem({ value, onChange, error }: DateFormItemProps) {
//   const locale = useLocale();
//   const tField = useTranslations("pages.cart_summary.forms.shared.fields.date");
//   const tError = useTranslations("messages.error");

//   const formatter = new Intl.DateTimeFormat(locale);
//   return (
//     <FormItem className={cn(formItemClassName)}>
//       <FormLabel className={cn(labelClassName)}>{tField("label")}</FormLabel>

//       <FormControl>
//         <Popover>
//           <PopoverTrigger asChild>
//             <div
//               className={cn(
//                 "flex h-9 w-full cursor-pointer items-center justify-start rounded-full border px-3 text-sm text-muted-foreground",
//                 {
//                   "text-base text-primary": value,
//                 },
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {value ? formatter.format(value) : tField("placeholder")}
//             </div>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="center">
//             <Calendar
//               lang="pl"
//               locale={getCalendarLocale(locale)}
//               mode="single"
//               defaultMonth={value}
//               selected={value}
//               disabled={hasNoAvailableSlots}
//               onSelect={(date) => {
//                 // Only update the date if a new date is selected
//                 if (date && date?.toDateString() !== value?.toDateString()) {
//                   const utcDate = new Date(
//                     Date.UTC(
//                       date.getFullYear(),
//                       date.getMonth(),
//                       date.getDate(),
//                       0,
//                     ),
//                   );

//                   onChange(utcDate);
//                 }
//               }}
//               fromDate={new Date()}
//             />
//           </PopoverContent>
//         </Popover>
//       </FormControl>
//       {error && (
//         <span className="absolute text-xs text-destructive">
//           ({tError(error)})
//         </span>
//       )}
//     </FormItem>
//   );
// }
