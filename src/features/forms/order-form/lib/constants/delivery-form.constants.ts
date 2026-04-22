import { getFirstAvailableDate, getFirstAvailableSlot } from "../helpers/date";
import type {
  OrdererFormSchema,
  DeliveryFormSchema,
  RecipientFormSchema,
} from "../schema";

const firstAvailableDate = getFirstAvailableDate();

export const RECIPIENT_FORM_DEFAULT_VALUES: RecipientFormSchema = {
  name: "",
  phone: "",
  flowerMessage: "",
};
export const DELIVERY_FORM_DEFAULT_VALUES: DeliveryFormSchema = {
  address: "",
  city: "",
  postalCode: "",
  date: firstAvailableDate,
  time: getFirstAvailableSlot(firstAvailableDate),
};
export const ORDERER_FORM_DEFAULT_VALUES: OrdererFormSchema = {
  name: "",
  phone: "",
  email: "",
  description: "",
};
