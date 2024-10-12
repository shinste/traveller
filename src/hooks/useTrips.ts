import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useTripsContext } from "../context";
import fetchTrips from "../functions/fetchTrips";

// This is to refresh the trips data every rerender of page
const useTrips = () => {
  const { currentUser } = useAuth();
  const { updateTrips } = useTripsContext();
  useEffect(() => {
    fetchTrips(currentUser?.email, updateTrips);
  }, []);
};

export default useTrips;
