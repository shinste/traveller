import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ItineraryItem } from "../types";

const createItinerary = async (ItinieraryItem: ItineraryItem) => {
  const itineraryRef = collection(db, "itineraries");
  try {
    const docRef = await addDoc(itineraryRef, ItinieraryItem);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return "";
  }
};

export default createItinerary;
