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
import { CalendarProps, TripEvent } from "../types";

const Calendar: React.FC<CalendarProps> = ({events, setDateChosen, dateChosen, originalEventDates}) => {
    const [editEvent, setEditEvent] = useState<string[]>([]);

    const handleChangeEvent = (focusId: string) => {
        const touchedEvent: TripEvent | undefined = events.find((event) => event.id === focusId);
        if (dayjs(touchedEvent?.start).toISOString().slice(0, 19) !== dayjs(originalEventDates[focusId][0]).toISOString().slice(0, 19) || dayjs(touchedEvent?.end).toISOString().slice(0, 19) !== dayjs(originalEventDates[focusId][1]).toISOString().slice(0, 19)) {
            setEditEvent([...editEvent, focusId]);
        
        } else if (editEvent.includes(focusId)) {
            setEditEvent(editEvent.filter((eventId) => eventId !== focusId))
            console.log('same')
            console.log(editEvent)
        } else {
            console.log(dayjs(touchedEvent?.start).toISOString().slice(0, 19))
            console.log(dayjs(originalEventDates[focusId][0]).toISOString().slice(0, 19))
        }
        // console.log(id)
    }
    useEffect(() => {
     console.log(originalEventDates)   
    })
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
          <DayPilotMonth onEventMove={event => {console.log(event); console.log(events)}} onEventResized={event => handleChangeEvent(event.e.data.id)} events={events} startDate={dateChosen} cellHeight={130}/>
            {editEvent.length > 0 &&
            

            <div id="Update-calendar">
                <button
                className="btn btn-outline-primary"
                style={{ backgroundColor: "#B6D3FD", fontSize: "25px" }}
                // onClick={handleUpdate}
                >
                Update Event Changes
                </button>
          </div>
}
          </div>
        </div>
    )
}

export default Calendar;