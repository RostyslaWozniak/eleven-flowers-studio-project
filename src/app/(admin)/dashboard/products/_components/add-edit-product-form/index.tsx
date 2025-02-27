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
import { type AdminProductDto } from "@/server/api/routers/admin/types/product-types";
import { PriceSizeInput } from "./price-size-input";
import { ImageSelect } from "./image-select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

export const ProductForm = ({
  product,
  setIsEditOpen,
}: {
  product?: AdminProductDto;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

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

  const { mutate: createProduct, isPending: isCreating } =
    api.admin.products.create.useMutation({
      onSuccess: () => {
        toast.success("Product created");
        router.push("/dashboard/products");
      },
      onError: () => {
        toast.error("Product create failed");
      },
    });
  const { mutate: updateProduct, isPending: isUpdating } =
    api.admin.products.update.useMutation({
      onSuccess: () => {
        toast.success("Product created");
        router.refresh();
        if (setIsEditOpen) setIsEditOpen(false);
      },
      onError: () => {
        toast.error("Product update failed");
        if (setIsEditOpen) setIsEditOpen(false);
      },
    });

  function onSubmit(values: AddProductSchema) {
    if (!product) {
      createProduct(values);
    } else {
      updateProduct(values);
    }
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
        <LoadingButton
          type="submit"
          className="self-end"
          loading={isCreating || isUpdating}
        >
          {product ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
};
