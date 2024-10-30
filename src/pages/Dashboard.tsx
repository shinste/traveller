import NavBar from "../components/NavBar";
import MiniCalendar from "../components/MiniCalendar";
import * as CONSTANTS from "../constants/navBar";
import DashboardColors from "../components/DashboardColors";
import useTrips from "../hooks/useTrips";
import {
  DayPilotCalendar,
  DayPilotMonth,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useTripsContext } from "../context";
import { TripEvent } from "../types";
import Calendar from "../components/Calendar";
const Dashboard = () => {
  const { tripsData } = useTripsContext();
  const [dateChosen, setDateChosen] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const [events, setEvents] = useState<TripEvent[]>([]);
  const eventsRef = useRef<any>();
  // const originalEventDates = Object.fromEntries(eventsRef.current.map((event) => [event.id, [event.start, event.end]]))
  // eventsRef
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
    // ATTENTION I MIGHT HAVE TO FIX THE UPDATING ON THIS WHEN THE USER CHANGES THE EVENT DATE IN THE CALENDAR, EVENTSREF.CURRENT HAS TO CHANGE TO NEW UPDATED EVENTS, HOPEFULLY THIS WILL BE DONE THROUGH A TRIPSDATA UPDATE, SO TRY DOING THAT
    eventsRef.current = Object.fromEntries(
      output.map((event) => [event.id, [event.start, event.end]])
    );
    console.log(
      Object.fromEntries(
        output.map((event) => [event.id, [event.start, event.end]])
      )
    );
  }, [tripsData]);
  return (
    <div className="Page-default">
      <div id="Dashboard-main-div">
        <NavBar page={CONSTANTS.TITLE_DASHBOARD} />

        <Calendar
          events={events}
          setDateChosen={setDateChosen}
          dateChosen={dateChosen}
          originalEventDates={eventsRef.current}
        />
      </div>
    </div>
  );
};

export default Dashboard;
