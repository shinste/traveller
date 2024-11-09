import { DayPilot } from "@daypilot/daypilot-lite-react";
import { useState } from "react";
import { useTripsContext } from "../contexts/tripContext";
import updateItems from "../functions/updateItems";
import { TripEvent } from "../types";

const useUpdateCalendar = (originalEventDates: any, events: TripEvent[]) => {
  const { refresh, updateRefresh } = useTripsContext();
  const [editEvent, setEditEvent] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Detects if event dates changed by user are different from original
  const handleChangeEvent = (
    newStart: DayPilot.Date,
    newEnd: DayPilot.Date,
    focusId: string
  ) => {
    // If either the start or end date is changed include that event as being edited
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
    }
  };

  // Any changes to event times will be updated through firebase
  const handleUpdateEvents = async () => {
    const status = await updateItems(events, editEvent, true);
    if (status) {
      setEditEvent([]);
      updateRefresh(refresh + 1);
      setError("");
    } else {
      setError(
        "There was a problem updating your event(s), please try again or come back later!"
      );
    }
  };

  return { handleChangeEvent, handleUpdateEvents, editEvent, error };
};

export default useUpdateCalendar;
