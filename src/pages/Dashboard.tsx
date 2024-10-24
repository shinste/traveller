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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTripsContext } from "../context";
import { TripEvent } from "../types";
const Dashboard = () => {
  const config = {
    // ...
    durationBarVisible: false,
    showAllDayEvents: true,
    // ...
  };
  const { tripsData } = useTripsContext();
  const [dateChosen, setDateChosen] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const [events, setEvents] = useState<TripEvent[]>([]);
  useTrips();

  useEffect(() => {
    const output: TripEvent[] = tripsData.map((trip) => {
      return {
        id: Number(trip.id),
        text: trip.name,
        start: `${trip.startDate}${trip.startTime}`,
        end: `${trip.endDate}${trip.endTime}`,
        backColor: trip.color,
        participants: 1,
      };
    });
    setEvents(output);
    // setEvents(tripsData.map((trip) => {
    //   return {id: trip.id, text: trip.name, start: `${trip.startDate}T10:30:00`, }
    // }))
  }, [tripsData]);
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
            <DashboardColors setDateChosen={setDateChosen} />
          </div>
          <div id="Hold-calendar">
            {/* <DayPilotMonth
            // viewType="Days"
            // startDate={dateChosen}
            // events={events}
            // // height={100}
            // hourWidth={60}
            // heightSpec="BusinessHours"
            // {...config}
            startDate={dateChosen}
            events={events}
            // visible={view === "Month"}
            eventBarVisible={false}
            onTimeRangeSelected={onTimeRangeSelected}
            controlRef={setMonthView}
            /> */}
            <DayPilotCalendar
              viewType="Week"
              startDate={dateChosen}
              events={events}
              hourWidth={60}
              heightSpec="BusinessHours"
              {...config}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
