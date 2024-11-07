import dayjs from "dayjs";

const findOverlap = (
  activeStart: dayjs.Dayjs,
  activeEnd: dayjs.Dayjs,
  prevStart: string,
  prevEnd: string
) => {
  const range2Start = dayjs(prevStart);
  const range2End = dayjs(prevEnd);

  // Create an array to hold the overlapping days
  let overlappingDays = [];

  // Iterate through the first date range
  let currentDate = activeStart;
  while (
    currentDate.isBefore(activeEnd) ||
    currentDate.isSame(activeEnd, "day")
  ) {
    // Check if the currentDate overlaps with the second date range
    if (currentDate.isBetween(range2Start, range2End, null, "[)")) {
      overlappingDays.push(currentDate.format("YYYY-MM-DD"));
    }
    currentDate = currentDate.add(1, "day");
  }
  console.log(overlappingDays);
  return overlappingDays;
};

export default findOverlap;
