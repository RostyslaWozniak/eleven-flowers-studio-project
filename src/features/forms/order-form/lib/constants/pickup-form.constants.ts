// import { getFirstAvailableDate, getFirstAvailableSlot } from "../helpers/date";
import type { OrdererFormSchema, PickupDatAndTimeFormSchema } from "../schema";

// const firstAvailableDate = getFirstAvailableDate();
export const PICKUP_DATE_AND_TIME_DEFAULT_VALUES: PickupDatAndTimeFormSchema = {
  // date: firstAvailableDate,
  // time: getFirstAvailableSlot(firstAvailableDate),
  date: undefined,
  time: undefined,
};

export const PICKUP_ORDERER_FORM_DEFAULT_VALUES: OrdererFormSchema = {
  name: "",
  phone: "",
  email: "",
  description: "",
};
