// import { getFirstAvailableDate, getFirstAvailableSlot } from "../helpers/date";
import type { PickupDatAndTimeFormSchema } from "../schema";
import { type PickupOrdererFormSchema } from "../schema/pickup-orderer-form.schema";

// const firstAvailableDate = getFirstAvailableDate();
export const PICKUP_DATE_AND_TIME_DEFAULT_VALUES: PickupDatAndTimeFormSchema = {
  // date: firstAvailableDate,
  // time: getFirstAvailableSlot(firstAvailableDate),
  date: undefined,
  time: undefined,
};

export const PICKUP_ORDERER_FORM_DEFAULT_VALUES: PickupOrdererFormSchema = {
  name: "",
  phone: "",
  email: "",
  paymentStatus: "PENDING",
};
