import type {
  OrdererFormSchema,
  DeliveryFormSchema,
  RecipientFormSchema,
} from "../schema";

export const RECIPIENT_FORM_DEFAULT_VALUES: RecipientFormSchema = {
  name: "",
  phone: "",
  flowerMessage: "",
};
export const DELIVERY_FORM_DEFAULT_VALUES: DeliveryFormSchema = {
  address: "",
  city: "",
  postalCode: "",
  date: undefined,
  time: undefined,
};
export const ORDERER_FORM_DEFAULT_VALUES: OrdererFormSchema = {
  name: "",
  phone: "",
  email: "",
  description: "",
};
