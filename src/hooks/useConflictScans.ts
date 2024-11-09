import { useEffect, useState } from "react";
import { useTripsContext } from "../contexts/tripContext";
import { OverlapConflicts, StartConflicts, TripData } from "../types";
import findOverlap from "../functions/findOverlap";
import dayjs from "dayjs";

const useConflictScans = (
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null,
  color: string | null
) => {
  const { tripsData } = useTripsContext();
  const [startConflicts, setStartConflicts] = useState<StartConflicts[]>();
  const [overlapConflicts, setOverlapConflicts] = useState<OverlapConflicts>();
  const [colorConflicts, setColorConflicts] = useState<string[]>();

  // Checks if any other event has the same event start date
  const scanStart = () => {
    let filteredList: any = tripsData.filter(
      (trip) => trip.startDate === startDate?.format("YYYY-MM-DD")
    );
    if (filteredList && filteredList.length > 0) {
      filteredList = filteredList.map((trip: TripData) => {
        return {
          name: trip.name,
          date: trip.startDate,
        };
      });
      setStartConflicts(filteredList);
    } else {
      setStartConflicts(undefined);
    }
  };

  // Checks to see if the proposed event date range overlaps with other events
  const scanOverlap = () => {
    if (startDate && endDate) {
      const overlapObject: OverlapConflicts = {};
      tripsData.forEach((event) => {
        const overlapDays = findOverlap(
          startDate,
          endDate,
          event.startDate,
          event.endDate
        );
        if (overlapDays && overlapDays.length > 0) {
          overlapObject[event.name] = overlapDays;
        }
      });
      setOverlapConflicts(overlapObject);
      console.log(overlapObject);
    }
  };

  // Checks to see if any other events have the same color
  const scanColor = () => {
    if (color) {
      const filteredData = tripsData.filter((event) => event.color === color);
      if (filteredData.length > 0) {
        setColorConflicts(
          filteredData.map((event) => {
            return event.name;
          })
        );
      } else {
        setColorConflicts(undefined);
      }
    }
  };

  // Any time the start and end date changes the scans will begin for start and overlap
  useEffect(() => {
    if (startDate) {
      scanStart();
      if (endDate) {
        scanOverlap();
      }
    }
  }, [startDate, endDate]);

  // Checking color every time it changes
  useEffect(() => {
    scanColor();
  }, [color]);

  return { startConflicts, overlapConflicts, colorConflicts };
};

export default useConflictScans;
