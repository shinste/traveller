import { TextField } from "@mui/material";
// import CustomTimePicker from "./CustomTimePicker";
import DatePickerCustom from "./DatePickerCustom";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  CustomSchedulerProps,
  ItineraryControlProps,
  ItineraryItem,
} from "../types";
import createItinerary from "../functions/createItinerary";
import dayjs, { Dayjs } from "dayjs";
import updateItinerary from "../functions/updateItinerary";
import deleteEntry from "../functions/deleteEntry";

const ItineraryControl: React.FC<ItineraryControlProps> = ({
  selectedTrip,
  itineraryUpdate,
  setItineraryUpdate,
  editItem,
  // key,
  // setKey,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState("");

  //   const nameItinerary: MutableRefObject<string | undefined> = useRef();
  // const handleStartChange = (date: dayjs.Dayjs | null) => {
  //   if (date) {
  //     ItineraryItemRef.current.startDate = date.format("YYYY-MM-DD");
  //   }
  // };
  // const handleEndChange = (date: dayjs.Dayjs | null) => {
  //   if (date) {
  //     ItineraryItemRef.current.endDate = date.format("YYYY-MM-DD");
  //   }
  // };
  //   const handleEndChange = () => {};
  const handleCreateItinerary = async () => {
    if (!name) {
      setError("Please provide a valid name");
    } else if (!startDate) {
      setError("Please provide a valid start date");
    } else if (!endDate) {
      setError("Please provide a valid end date");
    } else if (startDate < dayjs(selectedTrip.startDate)) {
      setError("Your start date cannot be before the trip end date.");
      console.log("before");
    } else if (endDate > dayjs(selectedTrip.endDate)) {
      setError("Your end date cannot be after the trip end date.");
    } else {
      const status = await createItinerary({
        name: name,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        trip: selectedTrip.name,
      });
      if (status) {
        setItineraryUpdate(itineraryUpdate + 1);
        setName("");
        setStartDate(null);
        setEndDate(null);
        setError("");
      } else {
        // error
      }
    }
  };

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setStartDate(dayjs(editItem.startDate));
      setEndDate(dayjs(editItem.endDate));
    } else {
      setName("");
      setStartDate(null);
      setEndDate(null);
    }
  }, [editItem]);

  const handleEditItinerary = () => {
    if (!name) {
      setError("Please provide a valid name");
    } else if (!startDate) {
      setError("Please provide a valid start date");
    } else if (!endDate) {
      setError("Please provide a valid end date");
    } else if (startDate < dayjs(selectedTrip.startDate)) {
      setError("Your start date cannot be before the trip start date.");
    } else if (endDate > dayjs(selectedTrip.endDate)) {
      setError("Your end date cannot be after the trip end date.");
    } else if (editItem) {
      updateItinerary({
        id: editItem.id,
        name: name,
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
        trip: editItem.trip,
      });
      setError("");
      setItineraryUpdate(itineraryUpdate + 1);
    }
  };

  const handleDelete = () => {
    if (editItem) {
      deleteEntry(["dfs"], "itineraries", editItem.id);
      setItineraryUpdate(itineraryUpdate + 1);
    }
  };
  return (
    <div id="Control-itinerary">
      <h3>{!editItem ? "Add Itinerary Item" : "Edit " + name}</h3>
      <div className="Padding-hori">
        <div className="Align-down Flex-space Forms">
          <div className="Form-div">
            {error.includes("name") && (
              <p className="Error-message Error-positioning">{error}</p>
            )}
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Itinerary Item Name"
            />
          </div>

          <div className="Form-div">
            {error.includes("start date") && (
              <p className="Error-message Error-positioning">{error}</p>
            )}
            <DatePickerCustom
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="Form-div">
            {error.includes("end date") && (
              <p className="Error-message Error-positioning">{error}</p>
            )}
            <DatePickerCustom
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <div id="Itinerary-button-div">
          {editItem && (
            <button
              type="button"
              role="submit"
              className="btn btn-outline-danger"
              style={{ color: "red" }}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            role="submit"
            className="btn btn-outline-primary"
            style={{ color: "black" }}
            onClick={editItem ? handleEditItinerary : handleCreateItinerary}
          >
            {editItem ? "Save Changes" : "Create Itinerary Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryControl;
