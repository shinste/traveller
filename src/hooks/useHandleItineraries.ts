import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import createItinerary from "../functions/createItinerary";
import dayjs, { Dayjs } from "dayjs";
import updateItinerary from "../functions/updateItinerary";
import deleteEntry from "../functions/deleteEntry";
import { ItineraryItem, TripData } from "../types";

const useHandleItineraries = (
  selectedTrip: TripData,
  itineraryUpdate: number,
  setItineraryUpdate: (update: number) => void,
  editItem: ItineraryItem | null | undefined
) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState("");

  const handleCreateItinerary = async () => {
    if (!name) {
      setError("Please provide a valid name");
    } else if (!startDate) {
      setError("Please provide a valid start date");
    } else if (!endDate) {
      setError("Please provide a valid end date");
    } else if (
      startDate < dayjs(selectedTrip.startDate) ||
      startDate > dayjs(selectedTrip.endDate)
    ) {
      setError(
        "Your start date is either before the trip start date or after the trip end date"
      );
    } else if (
      endDate > dayjs(selectedTrip.endDate) ||
      endDate < dayjs(selectedTrip.startDate)
    ) {
      setError(
        "Your end date either before the trip start date or after the trip end date"
      );
      console.log(startDate, selectedTrip.startDate);
    } else {
      const status = await createItinerary({
        name: name,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        trip: selectedTrip.id,
      });
      if (status) {
        setItineraryUpdate(itineraryUpdate + 1);
        setName("");
        setStartDate(null);
        setEndDate(null);
        setError("");
      } else {
        setError(
          "There was a problem updating your event(s), please try again or come back later!"
        );
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
    } else if (
      startDate < dayjs(selectedTrip.startDate) ||
      startDate > dayjs(selectedTrip.endDate)
    ) {
      setError("Your start date cannot be before the trip start date.");
    } else if (
      endDate > dayjs(selectedTrip.endDate) ||
      endDate < dayjs(selectedTrip.startDate)
    ) {
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
  return {
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
  };
};

export default useHandleItineraries;
