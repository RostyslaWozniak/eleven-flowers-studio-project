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

import { api } from "@/trpc/react";
import { PriceSizeInput } from "./price-size-input";
import { ImageSelect } from "./image-select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import type { ProductAdminDTO } from "@/server/modules/admin/product-admin/product-admin.types";
import { createProductAction } from "@/features/products/actions/create-product.action";
import { useTransition } from "react";
import { updateProductAction } from "@/features/products/actions/update-product.action";

export const ProductForm = ({
  product,
  setIsEditOpen,
}: {
  product?: ProductAdminDTO;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      collectionSlug: product?.collection?.slug ?? "",
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
      prices: product
        ? product.prices.map(({ size, price }) => ({
            size,
            price: price / 100,
          }))
        : [
            { size: "s", price: 0 },
            { size: "m", price: 0 },
            { size: "l", price: 0 },
          ],
      images: product?.images ?? [],
    },
  });

  const { data: collections } = api.admin.collections.getAll.useQuery();

  function onSubmit(values: AddProductSchema) {
    startTransition(async () => {
      if (!product) {
        const { error } = await createProductAction(values);

        startTransition(() => {
          if (error == null) {
            toast.success("Product created");
            router.push("/dashboard/products");
            if (setIsEditOpen) setIsEditOpen(false);
            return;
          }
          toast.error(error);
          if (setIsEditOpen) setIsEditOpen(false);
        });
      } else {
        const { error } = await updateProductAction({
          id: product.id,
          ...values,
        });
        if (error == null) {
          toast.success("Product updated");
          router.push("/dashboard/products");
          if (setIsEditOpen) setIsEditOpen(false);
          return;
        }
        toast.error(error);
        if (setIsEditOpen) setIsEditOpen(false);
      }
    });
  }

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
            {/* PRICES */}
            <PriceSizeInput form={form} />
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
              {collections && (
                <FormField
                  control={form.control}
                  name="collectionSlug"
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
                              {collections.map(({ slug }) => (
                                <SelectItem key={slug} value={slug}>
                                  {slug}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <ImageSelect form={form} />
                </div>
                <div>Selected {form.watch("images").length} images</div>
              </div>
            </div>
          </div>
        </div>
        <LoadingButton type="submit" className="self-end" loading={isPending}>
          {product ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
};
