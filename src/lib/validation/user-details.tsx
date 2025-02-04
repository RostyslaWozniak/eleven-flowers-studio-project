import { type TranslationValues } from "next-intl";
import { type Message } from "react-hook-form";
import { z } from "zod";
import { checkDelivery } from "../utils/delivery";

const requiredTranslationString = (
  t?: (key: Message, object?: TranslationValues) => string,
) => {
  return z
    .string({
      required_error: t?.("field-required"),
      invalid_type_error: t?.("field-required"),
    })
    .min(1, {
      message: t?.("field-min"),
    })
    .max(50, {
      message: t?.("field-max"),
    })
    .trim();
};

export function userDetailsSchema(
  t?: (key: Message, object?: TranslationValues) => string,
) {
  return z.object({
    firstName: requiredTranslationString(t),
    lastName: requiredTranslationString(t),
    email: requiredTranslationString(t).email(),
    address: requiredTranslationString(t),
    city: requiredTranslationString(t),
    postalCode: requiredTranslationString(t)
      .trim()
      .regex(/^\d{2}-\d{3}$/, {
        message: t?.("field-required"),
      })
      .refine(
        (postalCode) => {
          const deliveryInfo = checkDelivery(postalCode);
          return deliveryInfo.price !== null;
        },
        {
          message:
            t?.("postal-code-not-deliverable") ??
            "Delivery not available in this area.",
        },
      ),
  });
}

export type UserDetailsSchema = z.infer<ReturnType<typeof userDetailsSchema>>;
