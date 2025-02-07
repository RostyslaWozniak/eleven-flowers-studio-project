import { type DateAndMethodFormSchema } from "@/lib/validation/date-and-method-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  pickupFormSchema,
  type PickupFormSchema,
} from "@/lib/validation/pickup-form-schema";

export default function PickupForm({
  dateAndMethodData,
}: {
  dateAndMethodData: DateAndMethodFormSchema;
}) {
  const t = useTranslations("Checkout.details");

  const form = useForm<PickupFormSchema>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  function onSubmit(values: PickupFormSchema) {
    try {
      const data = {
        dateAndMethodData: dateAndMethodData,
        pickupDetails: values,
      };

      console.log(data);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
        className: "bg-destructive text-destructive-foreground",
      });
    }
  }
  return (
    <motion.div
      key="detail-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="lg:py-6"
    >
      <H2 className="text-start text-2xl font-light md:text-start">
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
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.firstName")}</FormLabel>
                      {form.formState.errors.firstName && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.firstName.message})
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
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
                    <div className="flex h-3 items-center">
                      <FormLabel>{t("form.lastName")}</FormLabel>
                      {form.formState.errors.lastName && (
                        <span className="ml-2 text-xs text-destructive">
                          {" "}
                          ({form.formState.errors.lastName.message})
                        </span>
                      )}
                    </div>

                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
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
                <div className="flex h-3 items-center">
                  <FormLabel>{t("form.email")}</FormLabel>
                  {form.formState.errors.email && (
                    <span className="ml-2 text-xs text-destructive">
                      {" "}
                      ({form.formState.errors.email.message})
                    </span>
                  )}
                </div>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="float-right h-12 w-full sm:w-min sm:max-w-sm"
            size="lg"
            type="submit"
          >
            {t("form.button")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
