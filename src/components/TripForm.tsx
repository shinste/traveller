import React, {
  SetStateAction,
  useRef,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import DatePickerCustom from "../components/DatePickerCustom";
import TextField from "@mui/material/TextField";
import { useAuth } from "../contexts/authContext";
import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { CirclePicker } from "react-color";
import useCreateTrip from "../hooks/useCreateTrip";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomTimePicker from "./CustomTimePicker";
import ConflictDisplay from "./ConflictDisplay";
import { TripData, TripFormProps } from "../types";
import { useTripsContext } from "../contexts/tripContext";
import { Description } from "@mui/icons-material";

const TripForm: React.FC<TripFormProps> = ({
  createTrip,
  setCreateTrip,
  setNewTrip,
}) => {
  const {
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    handleCreate,
    handleNameChange,
    handleChangeColor,
    handleLocationChange,
    color,
    errorMessage,
    handleStartTimeChange,
    handleEndTimeChange,
    handleDescription,
    editEvent,
    location,
    name,
    description,
    startTime,
    endTime,
  } = useCreateTrip(setCreateTrip, setNewTrip, createTrip);

  return (
    <div id="Entire-new-trip-div">
      <div id="Trip-form-div">
        <p className="Form-title">Create Trip</p>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="Vertical-flex">
          <h4>Details</h4>
          <div id="Name-div" className="Padding-hori">
            <div className="Flex-space">
              <TextField
                id="outlined-basic"
                className="mb-3"
                variant="outlined"
                required
                value={name}
                onChange={handleNameChange}
                sx={{ width: "15rem" }}
                label="Name of Trip"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={location}
                onChange={handleLocationChange}
                sx={{ width: "15rem" }}
                label="Location of Trip"
              />
            </div>
          </div>
          <div className="Padding-hori Color-picker">
            <CirclePicker
              width="110%"
              color={color}
              onChangeComplete={handleChangeColor}
              colors={[
                "#FF6347",
                "#FF8C00",
                "#FFD700",
                "#ADFF2F",
                "#00FA9A",
                "#40E0D0",
                "#4682B4",
                "#9370DB",
                "#FFB3BA",
                "#FF9AA2",
                "#FFC0CB",
                "#FFD1DC",
                "#FFDFBA",
                "#FFB347",
                "#B0E57C",
                "#77DD77",
                "#C1E1C1",
                "#BAFFC9",
                "#AEC6CF",
                "#BAE1FF",
                "#A1CAF1",
                "#89CFF0",
                "#D4C1EC",
                "#E0BBE4",
                "#FFDAC1",
                "#CFCFC4",
              ]}
            />
          </div>
          <h4>Date & Time</h4>
          <div id="Date-pickers" className="Padding-hori">
            <div className="Flex-space">
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
          </div>
          <div id="Time-pickers" className="Padding-hori">
            <CustomTimePicker
              change={handleStartTimeChange}
              label="Start Time"
              value={startTime}
            />
            <CustomTimePicker
              change={handleEndTimeChange}
              label="End Time"
              value={endTime}
            />
          </div>
          <div id="Description-new">
            <h4>Description</h4>
            <div className="Padding-hori">
              <TextField
                label="Describe Your Event"
                sx={{ width: "100%" }}
                value={description}
                onChange={handleDescription}
              ></TextField>
            </div>
          </div>
        </div>
        <div className="Justify-between">
          <button
            className="btn btn-outline-primary Custom-button"
            type="submit"
            onClick={handleCreate}
            style={{ backgroundColor: "#B6D3FD", fontSize: "25px" }}
          >
            {editEvent ? "Update" : "Create"}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCreateTrip("")}
            style={{ backgroundColor: "red", fontSize: "25px", color: "black" }}
          >
            Cancel
          </button>
        </div>
      </div>
      <ConflictDisplay startDate={startDate} endDate={endDate} color={color} />
    </div>
  );
};

export default TripForm;
