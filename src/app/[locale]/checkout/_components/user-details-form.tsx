"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import {
  type UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/validation/user-details";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useEffect } from "react";

export default function UserDetailsForm() {
  const tFormErrorMessages = useTranslations("Form");
  const t = useTranslations("Checkout.details");

  const { storedCartId } = useCart();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { data } = api.public.user.getUserData.useQuery(
    {
      userId: userId ?? "",
    },
    {
      enabled: !!userId,
    },
  );

  const form = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema(tFormErrorMessages)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const { mutate: sendForm, isPending } =
    api.public.order.createNewOrder.useMutation({
      onError: (err) => {
        console.error(err);
        toast.error("Failed to submit the form. Please try again.", {
          className: "bg-destructive text-destructive-foreground",
        });
      },
      onSuccess: ({ message, userId }) => {
        if (userId) localStorage.setItem("userId", userId);
        toast.success(message, {
          className: "bg-emerald-500 text-background",
        });
        form.reset();
      },
    });

  function onSubmit(values: UserDetailsSchema) {
    if (!storedCartId) {
      toast.error("No Cart found!", {
        className: "bg-destructive text-destructive-foreground",
      });
      return;
    }
    try {
      sendForm({ cartId: storedCartId, ...values });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
        className: "bg-destructive text-destructive-foreground",
      });
    }
  }

  useEffect(() => {
    if (!data) return;
    form.setValue("firstName", data?.user?.firstName ?? "");
    form.setValue("lastName", data?.user?.lastName ?? "");
    form.setValue("email", data?.user?.email ?? "");
    form.setValue("address", data?.user?.address ?? "");
    form.setValue("city", data?.user?.city ?? "");
    form.setValue("postalCode", data?.user?.postalCode ?? "");
  }, [data, form]);

  return (
    <div className="border-primary/50 bg-white lg:border-l lg:pl-12">
      <H2 className="border-b text-start text-2xl font-light md:text-start lg:mb-6 lg:border-0">
        {t("title")}
      </H2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-4 py-8"
        >
          <div className="grid grid-cols-12 gap-2 md:gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.firstName")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.lastName")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.email")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.address")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.city")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.postalCode")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className="float-right w-full py-5 sm:max-w-sm"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader className="animate-spin" /> : t("form.button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
