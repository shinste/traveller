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
  } = useCreateTrip(setCreateTrip, setNewTrip);

  return (
    <div id="Entire-new-trip-div">
      <div id="Trip-form-div">
        {errorMessage && <p>{errorMessage}</p>}
        {/* <form onSubmit={handleCreate}> */}
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
          </div>
          <div className="Padding-hori Color-picker">
            <CirclePicker
              width="110%"
              color={color}
              onChangeComplete={handleChangeColor}
              colors={[
                "#FF6347", // Tomato Red
                "#FF8C00", // Dark Orange
                "#FFD700", // Gold
                "#ADFF2F", // Green Yellow
                "#00FA9A", // Medium Spring Green
                "#40E0D0", // Turquoise
                "#4682B4", // Steel Blue
                "#9370DB", // Medium Purple
                // Pinks and Reds
                "#FFB3BA", // Light Pink
                "#FF9AA2", // Pastel Coral
                "#FFC0CB", // Pastel Pink
                "#FFD1DC", // Pastel Red

                // Oranges and Yellows
                "#FFDFBA", // Peach
                "#FFB347", // Pastel Orange

                // Greens
                "#B0E57C", // Pastel Lime
                "#77DD77", // Pastel Green
                "#C1E1C1", // Pastel Mint
                "#BAFFC9", // Light Green

                // Blues
                "#AEC6CF", // Pastel Blue
                "#BAE1FF", // Light Blue
                "#A1CAF1", // Baby Blue
                "#89CFF0",

                // Purples and Lavenders
                "#D4C1EC", // Light Lavender
                "#E0BBE4", // Soft Purple

                "#FFDAC1", // Pastel Peach
                "#CFCFC4", // Pastel Gray
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
            />
            <CustomTimePicker change={handleEndTimeChange} label="End Time" />
          </div>
          <div id="Description-new">
            <h4>Description</h4>
            <div className="Padding-hori">
              <TextField
                label="Describe Your Event"
                sx={{ width: "100%" }}
                onChange={handleDescription}
              ></TextField>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-primary Custom-button"
          type="submit"
          onClick={handleCreate}
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
        {/* </form> */}
      </div>
    </div>
  );
};

export default TripForm;
