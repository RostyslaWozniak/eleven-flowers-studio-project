"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addProductSchema,
  type AddProductSchema,
} from "@/lib/validation/product";
import { FormButton } from "@/components/form/form-button";

import { api } from "@/trpc/react";

export const ProductForm = () => {
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      slug: "",
      collection: "",
      translations: {
        pl: {
          name: "",
          description: "",
        },
        en: {
          name: "",
          description: "",
        },
        ru: {
          name: "",
          description: "",
        },
      },
      prices: {
        small: 0,
        medium: 0,
        large: 0,
      },
      images: [""],
    },
  });

  const { mutate: createProduct, isPending: isCreating } =
    api.admin.products.createProduct.useMutation({
      onSuccess: () => {
        console.log("Product created");
        form.reset();
      },
    });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images" as never,
  });

  function onSubmit(values: AddProductSchema) {
    createProduct(values);
  }
  if (fields.length === 0) {
    append("");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5"
      >
        <div className="grid w-full grid-cols-1 flex-col gap-3">
          <div className="grid w-full grid-cols-3 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="translations.pl.name"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Nazwa*</FormLabel>
                  <FormControl>
                    <Input placeholder="Wpisz nazwę" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translations.en.name"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translations.ru.name"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Название*</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid min-h-[150px] w-full grid-cols-3 gap-4">
            {/* Desctiption */}
            <FormField
              control={form.control}
              name="translations.pl.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wpisz opis"
                      className="min-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translations.en.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter name"
                      className="min-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translations.ru.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oписание*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите описание"
                      className="min-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full grid-cols-3 gap-4">
            {/*Prices */}
            <FormField
              control={form.control}
              name="prices.small"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Price Small</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price for small product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prices.medium"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Price Medium</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price for medium product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prices.large"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Price Large</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price for large product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Slug*</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Product slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Collection */}
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem className="h-24">
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a collection" />
                      </SelectTrigger>
                      <SelectContent {...field}>
                        <SelectGroup>
                          <SelectLabel>Collection</SelectLabel>
                          {["bouquets", "flower-box", "balony", "gifts"].map(
                            (collection) => (
                              <SelectItem key={collection} value={collection}>
                                {collection}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          {/* Images */}
          <div className="max-w-3xl space-y-4">
            {fields.map((field: { id: string }, index: number) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`images.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL {index + 1}</FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        className="w-min text-sm"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-min text-sm"
              onClick={() => append("")} // Add a new empty image URL field
            >
              Add Image URL
            </Button>
          </div>
        </div>
        <FormButton isLoading={isCreating} label={false ? "Save" : "Create"} />
      </form>
    </Form>
  );
};
