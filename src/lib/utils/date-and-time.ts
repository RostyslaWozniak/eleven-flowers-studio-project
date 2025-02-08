import {
  ADDITIONAL_TIME,
  type deliveryTimeArray,
} from "../validation/date-and-method-form-schema";

export function isValidTime(
  time: (typeof deliveryTimeArray)[number],
  date: Date,
) {
  const currentDateTime = new Date();
  if (currentDateTime.getDay() !== date.getDay()) return true;
  const start = time.split("-")[0];
  if (!start) return true;
  const startHour = parseInt(start);

  const currentHour = currentDateTime.getHours();

  return startHour - ADDITIONAL_TIME > currentHour;
}

export function getValidTime(delivaryTimes: typeof deliveryTimeArray) {
  const currentHour = new Date().getHours();

  const filteredTimes = delivaryTimes.filter((time) => {
    const start = time.split("-")[0];
    if (!start) return true;
    return currentHour + 2 < parseInt(start);
  });
  console.log(filteredTimes);
  return filteredTimes[0];
}
