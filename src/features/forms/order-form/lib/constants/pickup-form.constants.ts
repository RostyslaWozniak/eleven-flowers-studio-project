import type { OrdererFormSchema, PickupDatAndTimeFormSchema } from "../schema";

export const PICKUP_DATE_AND_TIME_DEFAULT_VALUES: PickupDatAndTimeFormSchema = {
  date: new Date(),
  time: "10:00-13:00",
};

export const PICKUP_ORDERER_FORM_DEFAULT_VALUES: OrdererFormSchema = {
  name: "",
  phone: "",
  email: "",
  description: "",
};
