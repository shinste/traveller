import useTrips from "../hooks/useTrips";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { TripEvent } from "../types";
import { useTripsContext } from "../contexts/tripContext";

const useDashboardPage = () => {
  const { tripsData } = useTripsContext();
  const [dateChosen, setDateChosen] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const [events, setEvents] = useState<TripEvent[]>([]);
  const eventsRef = useRef<any>();
  useTrips();

  useEffect(() => {
    const output: TripEvent[] = tripsData.map((trip) => {
      return {
        id: trip.id,
        text: trip.name,
        start: `${trip.startDate}${trip.startTime}`,
        end: `${trip.endDate}${trip.endTime}`,
        backColor: trip.color,
        participants: 1,
      };
    });
    setEvents(output);
    // ATTENTION I MIGHT HAVE TO FIX THE UPDATING ON THIS WHEN THE USER CHANGES THE EVENT DATE IN THE CALENDAR, EVENTSREF.CURRENT HAS TO CHANGE TO NEW UPDATED EVENTS, HOPEFULLY THIS WILL BE DONE THROUGH A TRIPSDATA UPDATE, SO TRY DOING THAT
    eventsRef.current = Object.fromEntries(
      output.map((event) => [event.id, [event.start, event.end]])
    );

    console.log(eventsRef.current, "curr");
    console.log(
      Object.fromEntries(
        output.map((event) => [event.id, [event.start, event.end]])
      ),
      "sdlkjfa"
    );
  }, [tripsData]);
  return { events, setDateChosen, dateChosen, eventsRef };
};

export default useDashboardPage;
