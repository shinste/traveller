import { Dayjs } from "dayjs";

const getDatesBetween = (start: Dayjs, end: Dayjs) => {
  const dates = [];
  let currentDate = start;

  while (currentDate.isBefore(end) || currentDate.isSame(end)) {
    dates.push(currentDate); // Add the current date to the array
    currentDate = currentDate.add(1, "day"); // Move to the next day
  }

  return dates;
};

export default getDatesBetween;
