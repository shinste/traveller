import NavBar from "../components/NavBar";
import MiniCalendar from "../components/MiniCalendar";
import * as CONSTANTS from "../constants/navBar";
import DashboardColors from "../components/DashboardColors";
import useTrips from "../hooks/useTrips";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotMonth,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useTripsContext } from "../context";
import { CalendarProps, TripEvent } from "../types";
import updateItems from "../functions/updateItems";

const Calendar: React.FC<CalendarProps> = ({
  events,
  setDateChosen,
  dateChosen,
  originalEventDates,
}) => {
  const { refresh, updateRefresh } = useTripsContext();
  const [editEvent, setEditEvent] = useState<string[]>([]);

  // Detects if event dates changed by user are different from original
  const handleChangeEvent = (
    newStart: DayPilot.Date,
    newEnd: DayPilot.Date,
    focusId: string
  ) => {
    //If either the start or end date is changed include that event as being edited
    if (
      newStart.toString() !== originalEventDates[focusId][0] ||
      newEnd.toString() !== originalEventDates[focusId][1]
    ) {
      if (!editEvent.includes(focusId)) {
        setEditEvent([...editEvent, focusId]);
      }
      // If neither the start or end is being changed remove it from the edited list
    } else if (editEvent.includes(focusId)) {
      setEditEvent(editEvent.filter((eventId) => eventId !== focusId));
    } else {
      console.log(newStart, newEnd, focusId);
      console.log(
        dayjs(originalEventDates[focusId][0]).toISOString().slice(0, 19)
      );
    }
  };

  const handleUpdateEvents = async () => {
    // console.log(events);
    const status = await updateItems(events, editEvent, true);
    if (status) {
      setEditEvent([]);
      updateRefresh(refresh + 1);
    } else {
    }
  };
  return (
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
      <div className="Hold-calendar">
        {/* eventmove dont work, must fix */}
        <DayPilotMonth
          onEventMove={(event) => {
            handleChangeEvent(event.newStart, event.newEnd, event.e.data.id);
          }}
          onEventResized={(event) => {
            handleChangeEvent(event.newStart, event.newEnd, event.e.data.id);
          }}
          events={events}
          startDate={dateChosen}
          cellHeight={130}
        />
        {editEvent.length > 0 && (
          <div id="Update-calendar">
            <button
              className="btn btn-outline-primary"
              style={{ backgroundColor: "#B6D3FD", fontSize: "25px" }}
              onClick={handleUpdateEvents}
            >
              Update Event Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
