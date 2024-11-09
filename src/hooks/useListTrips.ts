import { useState } from "react";
import * as React from "react";
import { useTripsContext } from "../contexts/tripContext";
import deleteEntry from "../functions/deleteEntry";
import { TripData } from "../types";

const useListTrips = (setHighlight: (highlight: number) => void) => {
  const handleTripClick = (index: number) => {
    setHighlight(index);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>();

  const { tripsData, refresh, updateRefresh } = useTripsContext();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tripId: TripData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrip(tripId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTrip = (id: string) => {
    deleteEntry([id], "trips");
    setTimeout(function () {
      updateRefresh(refresh + 1);
    }, 5000);
    updateRefresh(refresh + 1);
    setDialog(false);
    setAnchorEl(null);
  };

  return {
    tripsData,
    handleTripClick,
    open,
    handleClick,
    anchorEl,
    handleClose,
    selectedTrip,
    setDialog,
    dialog,
    handleDeleteTrip,
  };
};

export default useListTrips;
