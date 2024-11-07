import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import { useTripsContext } from "../contexts/tripContext";
import { TripData } from "../types";

const fetchTrips = async (
  email: string | undefined | null,
  updateTrips: (newTrip: TripData[]) => void
) => {
  const tripsRef = collection(db, "trips");
  const q = query(tripsRef, where("user", "==", email));
  try {
    const querySnapshot = await getDocs(q);
    const mappedTrips: TripData[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      user: doc.data().user,
      location: doc.data().location || "",
      color: doc.data().color,
      tripID: doc.data().tripID,
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      startTime: doc.data().startTime,
      endTime: doc.data().endTime,
      description: doc.data().description,
    }));
    updateTrips(mappedTrips);
    console.log(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchTrips;
