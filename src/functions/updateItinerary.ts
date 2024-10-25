import { ItineraryItem, ToDoData } from "../types";
import { writeBatch, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const updateItinerary = async (itinerary: ItineraryItem) => {
  const itineraryDocRef = doc(db, "itineraries", itinerary.id!);
  try {
    await updateDoc(itineraryDocRef, {
      name: itinerary.name,
      startDate: itinerary.startDate,
      endDate: itinerary.endDate,
      trip: itinerary.trip,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export default updateItinerary;
