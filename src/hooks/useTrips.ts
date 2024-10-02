import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useTripsContext } from "../context";
import fetchTrips from "../functions/fetchTrips";

const useTrips = () => {
    const { currentUser } = useAuth();
    const { updateTrips } = useTripsContext();
    useEffect(() => {
        fetchTrips(currentUser?.email, updateTrips);
        console.log('refreshing thing')
    }, [])
}

export default useTrips;