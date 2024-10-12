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
import { useTripsContext } from "../context";
import useCreateTrip from "../hooks/useCreateTrip";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomTimePicker from "./CustomTimePicker";

interface TripFormProps {
  setCreateTrip: React.Dispatch<SetStateAction<boolean>>;
  setNewTrip: React.Dispatch<SetStateAction<string>>;
}
const TripForm: React.FC<TripFormProps> = ({ setCreateTrip, setNewTrip }) => {
  const {
    handleStartChange,
    handleEndChange,
    handleCreate,
    handleNameChange,
    handleChangeColor,
    handleLocationChange,
    color,
    errorMessage,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useCreateTrip(setCreateTrip, setNewTrip);

  return (
    <div id="Entire-new-trip-div">
      <div id="Trip-form-div">
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleCreate}>
          <div className="Vertical-flex">
            <h4>Details</h4>
            <div id="Name-div" className="Padding-hori">
              <div className="Flex-space">
                <TextField
                  id="outlined-basic"
                  className="mb-3"
                  variant="outlined"
                  required
                  onChange={handleNameChange}
                  sx={{ width: "15rem" }}
                  label="Name of Trip"
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleLocationChange}
                  sx={{ width: "15rem" }}
                  label="Location of Trip"
                />
              </div>

              {/* <CirclePicker color={color} onChangeComplete={handleChangeColor}/> */}
            </div>
          </div>
          <div className="Vertical-flex">
            <h4>Date & Time</h4>
            <div id="Date-pickers" className="Padding-hori">
              <div className="Flex-space">
                <DatePickerCustom
                  label="Start Date"
                  onChange={handleStartChange}
                />
                <DatePickerCustom label="End Date" onChange={handleEndChange} />
              </div>
            </div>
            <div id="Time-pickers" className="Padding-hori">
              <CustomTimePicker
                change={handleStartTimeChange}
                label="Start Time"
              />

              <CustomTimePicker change={handleEndTimeChange} label="End Time" />
            </div>
          </div>
          <div id="Description-new">
            <h4>Description</h4>
            <div className="Padding-hori">
              <TextField
                label="Describe Your Event"
                sx={{ width: "100%" }}
              ></TextField>
            </div>
          </div>
          <button
            className="btn btn-outline-primary Custom-button"
            type="submit"
            style={{ backgroundColor: "#B6D3FD", fontSize: "25px" }}
          >
            Create
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCreateTrip(false)}
            style={{ backgroundColor: "red", fontSize: "25px", color: "black" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripForm;
