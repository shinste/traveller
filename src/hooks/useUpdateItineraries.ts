import { ItineraryItem, TripData } from "../types";
import { useEffect, useState } from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";
import convertDate from "../functions/convertDate";

const useUpdateItineraries = (selectedTrip: TripData, itineraries: any) => {
  const [editItem, setEditItem] = useState<ItineraryItem | undefined | null>(
    null
  );
  const [schedulerData, setSchedulerData] = useState<any>();

  const updateItineraries = async () => {
    const fullTrip = [
      {
        id: selectedTrip.id,
        label: {
          title: selectedTrip.name,
          subtitle: convertDate(selectedTrip),
        },
        data: [
          {
            id: selectedTrip.user,
            startDate: new Date(
              selectedTrip.startDate + selectedTrip.startTime
            ),
            endDate: new Date(selectedTrip.endDate + selectedTrip.endTime),
            occupancy: 3600,
            title: selectedTrip.name,
            description: selectedTrip.location,
            bgColor: selectedTrip.color,
          },
        ],
      },
    ];
    if (itineraries) {
      const exam = [
        ...fullTrip,
        ...itineraries.filter(
          (itinerary: any) => itinerary.data[0].trip === selectedTrip.id
        ),
      ];
      setSchedulerData(exam);
    }
  };

  useEffect(() => {
    console.log(schedulerData, "data", selectedTrip.name);
    updateItineraries();
    setEditItem(null);
  }, [selectedTrip, itineraries]);

  return { schedulerData, setSchedulerData, editItem, setEditItem };
};

export default useUpdateItineraries;
