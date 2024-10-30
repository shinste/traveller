import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ItineraryItem } from "../types";
import dayjs from "dayjs";

const fetchItineraries = async () => {
  const tripsRef = collection(db, "itineraries");
  try {
    const querySnapshot = await getDocs(tripsRef);
    let mappedTrips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      trip: doc.data().trip,
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
          title: element.name,
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
            trip: element.trip,
            bgColor: "#6a7aee",
          },
        ],
      });
    });
    console.log(returnList, "returnlist");
    return returnList;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchItineraries;
