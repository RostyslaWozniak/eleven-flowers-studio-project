import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { type AddProductSchema } from "@/lib/validation/product";
import { X } from "lucide-react";

export function PriceSizeInput({
  form,
}: {
  form: UseFormReturn<AddProductSchema>;
}) {
  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  if (priceFields.length === 0) {
    appendPrice({ size: "", price: 0 });
  }

  return (
    <div className="relative space-y-4">
      {priceFields.map((_, index) => {
        return (
          <div key={index}>
            <div className="grid grid-cols-9 items-end gap-x-3">
              <FormField
                control={form.control}
                key={index}
                name={`prices.${index}.size`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Product Size</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Provide product size" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={index + 1}
                name={`prices.${index}.price`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Provide product price" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {index === priceFields.length - 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="col-span-1"
                  onClick={() => removePrice(index)}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
        );
      })}
      <Button
        type="button"
        className="w-min border-none !bg-emerald-500 text-white"
        size="md"
        onClick={() => {
          appendPrice({
            size: "",
            price: 0,
          });
        }}
      >
        + Add new size
      </Button>
    </div>
  );
}
