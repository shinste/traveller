import { TextField } from "@mui/material";
import DatePickerCustom from "./DatePickerCustom";
import React from "react";
import { ItineraryControlProps } from "../types";
import useHandleItineraries from "../hooks/useHandleItineraries";

const ItineraryControl: React.FC<ItineraryControlProps> = ({
  selectedTrip,
  itineraryUpdate,
  setItineraryUpdate,
  editItem,
}) => {
  const {
    error,
    setName,
    name,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    handleEditItinerary,
    handleCreateItinerary,
    handleDelete,
  } = useHandleItineraries(
    selectedTrip,
    itineraryUpdate,
    setItineraryUpdate,
    editItem
  );

  return (
    <div id="Control-itinerary">
      <h3>
        {!editItem
          ? `Add Itinerary Item to ${selectedTrip.name}`
          : "Edit " + name}
      </h3>
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
            {error.includes("Your start date") && (
              <p className="Error-message Error-positioning">{error}</p>
            )}
            <DatePickerCustom
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="Form-div">
            {error.includes("Your end date") && (
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
          <button
            type="button"
            role="submit"
            className="btn btn-outline-primary mb-1"
            style={{ color: "black" }}
            onClick={editItem ? handleEditItinerary : handleCreateItinerary}
          >
            {editItem ? "Save Changes" : "Create Itinerary Item"}
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default ItineraryControl;
