import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ItineraryItem } from "../types";
import dayjs from "dayjs";

const fetchItineraries = async (selectedTripName: string) => {
  const tripsRef = collection(db, "itineraries");
  const q = query(tripsRef, where("trip", "==", selectedTripName));
  try {
    const querySnapshot = await getDocs(q);
    let mappedTrips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      trip: selectedTripName,
    }));
    mappedTrips = mappedTrips.sort((a, b) => {
      return dayjs(a.startDate).isBefore(dayjs(b.startDate)) ? -1 : 1;
    });
    const returnList: any = [];
    mappedTrips.forEach((element, index) => {
      returnList.push({
        id: element.id,
        label: {
          icon: "https://picsum.photos/24",
          title: `Itinerary Item #${index + 1}`,
          subtitle:
            dayjs(element.startDate).format("MMMM D, YYYY") +
            "-" +
            dayjs(element.endDate).format("MMMM D, YYYY"),
        },
        data: [
          {
            id: element.id,
            startDate: new Date(element.startDate + "T00:00:00"),
            endDate: new Date(element.endDate + "T00:00:00"),
            occupancy: 3600,
            title: element.name,
            // description: selectedTrip.description,
            bgColor: "#6a7aee",
          },
        ],
      });
    });
    return returnList;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchItineraries;
