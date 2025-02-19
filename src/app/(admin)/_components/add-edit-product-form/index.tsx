"use client";
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
import { useForm } from "react-hook-form";
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
import { type AdminProductDto } from "@/server/api/routers/admin/types/product-types";
import { useEffect } from "react";
import { PriceSizeInput } from "./price-size-input";
import { ImageSelect } from "./image-select";
import Image from "next/image";

export const ProductForm = ({ product }: { product?: AdminProductDto }) => {
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      collection: product?.collection?.slug ?? "",
      translations: {
        pl: {
          name: product?.name.find(({ lang }) => lang === "pl")?.name ?? "",
          description:
            product?.description.find(({ lang }) => lang === "pl")
              ?.description ?? "",
        },
        en: {
          name: product?.name.find(({ lang }) => lang === "en")?.name ?? "",
          description:
            product?.description.find(({ lang }) => lang === "en")
              ?.description ?? "",
        },
        ru: {
          name: product?.name.find(({ lang }) => lang === "ru")?.name ?? "",
          description:
            product?.description.find(({ lang }) => lang === "ru")
              ?.description ?? "",
        },
      },
      slug: product?.slug ?? "",
      prices: [
        { size: "s", price: 100 },
        { size: "m", price: 200 },
        { size: "l", price: 300 },
      ],
      images: product?.images ?? [],
    },
  });

  const { mutate: createProduct, isPending: isCreating } =
    api.admin.products.createProduct.useMutation({
      onSuccess: () => {
        console.log("Product created");
        form.reset();
      },
    });

  function onSubmit(values: AddProductSchema) {
    createProduct(values);
    console.log(values);
  }

  useEffect(() => {
    form.setValue(
      "slug",
      form
        .getValues("translations.en.name")
        .toLocaleLowerCase()
        .replaceAll(" ", "-"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("translations.en.name")]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <div className="grid w-full grid-cols-1 flex-col gap-y-4">
          <div className="grid w-full grid-cols-3 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="translations.pl.name"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
          <div className="grid min-h-[150px] w-full grid-cols-2 gap-4">
            <div>
              {/* SLUG */}

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
              <ImageSelect form={form} />
              <div className="grid grid-cols-5">
                {form.getValues("images").length > 0 &&
                  form
                    .getValues("images")
                    .map((image) => (
                      <Image
                        key={image}
                        src={image}
                        alt="image"
                        width={100}
                        height={100}
                      />
                    ))}
              </div>
            </div>
            {/* PRICES */}
            <PriceSizeInput form={form} />
          </div>
        </div>

        <FormButton isLoading={isCreating} label={false ? "Save" : "Create"} />
      </form>
    </Form>
  );
};
