import DashboardColors from "../components/DashboardColors";
import {
  DayPilot,
  DayPilotMonth,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useTripsContext } from "../contexts/tripContext";
import { CalendarProps } from "../types";
import updateItems from "../functions/updateItems";
import useUpdateCalendar from "../hooks/useUpdateCalendar";

const Calendar: React.FC<CalendarProps> = ({
  events,
  setDateChosen,
  dateChosen,
  originalEventDates,
}) => {
  const { handleChangeEvent, handleUpdateEvents, editEvent, error } =
    useUpdateCalendar(originalEventDates, events);

  return (
    <div className="Flex">
      <div id="Dashboard-side-div" className="Main-padding">
        <div className="Margin-center">
          <DayPilotNavigator
            onTimeRangeSelected={(args) => {
              setDateChosen(args.day);
            }}
          />
        </div>

        <DashboardColors setDateChosen={setDateChosen} />
      </div>
      <div className="Hold-calendar">
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
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
