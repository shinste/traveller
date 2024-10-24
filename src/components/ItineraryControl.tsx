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
    if (!name || !startDate || !endDate) {
      // set error missing required fields
      console.log("invalid");
    } else if (startDate < dayjs(selectedTrip.startDate)) {
      // set error before date range
      console.log("before");
    } else if (endDate > dayjs(selectedTrip.endDate)) {
      // set error after date range
      console.log("after");
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
      } else {
        // error
      }
    }
  };

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      console.log(editItem);
      setStartDate(dayjs(editItem.startDate));
      setEndDate(dayjs(editItem.endDate));
    }
  }, [editItem]);

  const handleEditItinerary = () => {};
  return (
    <div id="Control-itinerary">
      <h3>Add Itinerary Item {name}</h3>
      <div className="Padding-hori">
        <div className="Align-down Flex-space">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Itinerary Item Name"
          />

          <DatePickerCustom
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePickerCustom
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div id="Itinerary-button-div">
          {editItem && (
            <button
              type="button"
              role="submit"
              className="btn btn-outline-danger"
              style={{ color: "red" }}
              // onClick={editItem ? handleEditItinerary : handleCreateItinerary}
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
