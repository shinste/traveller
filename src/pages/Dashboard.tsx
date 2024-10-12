import NavBar from "../components/NavBar";
import MiniCalendar from "../components/MiniCalendar";
import * as CONSTANTS from "../constants/navBar";
import DashboardColors from "../components/DashboardColors";
import useTrips from "../hooks/useTrips";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTripsContext } from "../context";
import { TripEvent } from "../types";
const Dashboard = () => {
  const eventse = [
    {
      id: 1,
      text: "Event 1",
      start: "2024-10-12T10:30:00",
      end: "2024-10-13T13:00:00",
      participants: 2,
    },
    {
      id: 2,
      text: "Event 2",
      start: "2024-10-12T11:30:00",
      end: "2024-10-13T13:00:00",
      backColor: "#6aa84f",
      participants: 1,
    },
  ];
  const { tripsData } = useTripsContext();
  const [dateChosen, setDateChosen] = useState<any>("2024-10-12");
  const [events, setEvents] = useState<TripEvent[]>([]);
  useTrips();

  useEffect(() => {
    const output: TripEvent[] = tripsData.map((trip) => {
      return {
        id: Number(trip.id),
        text: trip.name,
        start: `${trip.startDate}T10:30:00`,
        end: `${trip.endDate}T10:30:00`,
        backColor: trip.color,
        participants: 1,
      };
    });
    setEvents(output);
    // setEvents(tripsData.map((trip) => {
    //   return {id: trip.id, text: trip.name, start: `${trip.startDate}T10:30:00`, }
    // }))
  }, []);
  return (
    <div className="Page-default">
      <div id="Dashboard-main-div">
        <NavBar page={CONSTANTS.TITLE_DASHBOARD} />
        <div className="Flex">
          <div id="Dashboard-side-div" className="Main-padding">
            <DayPilotNavigator
              onTimeRangeSelected={(args) => {
                setDateChosen(args.day);
              }}
            />
            {/* <MiniCalendar /> */}
            <DashboardColors />
          </div>
          <div>
            <DayPilotCalendar
              viewType="Week"
              startDate={dateChosen}
              events={events}
              height={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
