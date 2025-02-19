"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  prices: z
    .array(
      z.object({
        size: z.string().min(1),
        price: z.coerce.number().min(1),
      }),
    )
    .nonempty({ message: "Product is required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export function TestForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      prices: [{ size: "", price: 0 }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "prices",
    control: form.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md flex-1 space-y-5"
        >
          <div className="products_name_price_desc relative">
            {fields.map((_, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-x-3">
                    <FormField
                      control={form.control}
                      key={index}
                      name={`prices.${index}.size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Size</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 1}
                      name={`prices.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Price</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
            <Button
              type="button"
              className="border-none !bg-emerald-500 text-white"
              size="icon"
              onClick={() => {
                append({
                  size: "",
                  price: 0,
                });
              }}
            >
              +
            </Button>
          </div>
          <div></div>
          <Button type="submit" className="!mt-0 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
