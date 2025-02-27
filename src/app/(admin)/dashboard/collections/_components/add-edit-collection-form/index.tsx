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

import { api } from "@/trpc/react";
import { type AdminCollectionDto } from "@/server/api/routers/admin/types/collection-types";
import {
  addCollectionSchema,
  type AddCollectionSchema,
} from "@/lib/validation/collection";
import { ImageSelect } from "./image-select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/loading-button";

export const CollectionForm = ({
  collection,
  setIsEditOpen,
}: {
  collection?: AdminCollectionDto;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const form = useForm<AddCollectionSchema>({
    resolver: zodResolver(addCollectionSchema),
    defaultValues: {
      translations: {
        pl: {
          name: collection?.name.find(({ lang }) => lang === "pl")?.name ?? "",
          description:
            collection?.description.find(({ lang }) => lang === "pl")
              ?.description ?? "",
        },
        en: {
          name: collection?.name.find(({ lang }) => lang === "en")?.name ?? "",
          description:
            collection?.description.find(({ lang }) => lang === "en")
              ?.description ?? "",
        },
        ru: {
          name: collection?.name.find(({ lang }) => lang === "ru")?.name ?? "",
          description:
            collection?.description.find(({ lang }) => lang === "ru")
              ?.description ?? "",
        },
      },
      slug: collection?.slug ?? "",
      imageUrl: collection?.imageUrl ?? "",
    },
  });

  const { mutate: createCollection, isPending: isCreating } =
    api.admin.collections.create.useMutation({
      onSuccess: () => {
        toast.success("Collection created");
        router.push("/dashboard/collections");
      },
      onError: () => {
        toast.error("Collection creation failed");
      },
    });
  const { mutate: updateCollection, isPending: isUpdating } =
    api.admin.collections.update.useMutation({
      onSuccess: () => {
        toast.success("Collection updated");
        if (setIsEditOpen) setIsEditOpen(false);
        router.refresh();
      },
      onError: () => {
        toast.error("Collection update failed");
        if (setIsEditOpen) setIsEditOpen(false);
      },
    });

  function onSubmit(values: AddCollectionSchema) {
    if (!collection) {
      createCollection(values);
    } else {
      updateCollection({ id: collection.id, ...values });
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
                    <Input autoFocus placeholder="Wpisz nazwę" {...field} />
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
                      <Input placeholder="Product slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3">
                <ImageSelect form={form} />
              </div>
            </div>
          </div>
        </div>

        <LoadingButton
          type="submit"
          className="self-end"
          loading={isCreating || isUpdating}
        >
          {collection ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
};
