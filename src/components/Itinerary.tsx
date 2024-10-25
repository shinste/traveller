import dayjs, { Dayjs } from "dayjs";
import { useTripsContext } from "../context";
import { ItineraryItem, ItineraryProps, SchedulerItem } from "../types";
import getDatesBetween from "../functions/daysBetween";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import isBetween from "dayjs/plugin/isBetween";
import "@bitnoi.se/react-scheduler/dist/style.css";
import CustomScheduler from "./CustomScheduler";
import ItineraryControl from "./ItineraryControl";
import fetchItineraries from "../functions/fetchItineraries";
import convertDate from "../functions/convertDate";

const Itinerary: React.FC<ItineraryProps> = ({
  selectedTrip,
  itineraries,
  itineraryUpdate,
  setItineraryUpdate,
}) => {
  const [editItem, setEditItem] = useState<ItineraryItem | undefined | null>(
    null
  );
  // const [itineraryUpdate, setItineraryUpdate] = useState(0);
  // useEffect(() => {
  //   setKeys(keys + 1);
  //   console.log("itinerary update");
  // }, [selectedTrip]);
  const [schedulerData, setSchedulerData] = useState<any>();
  // const [itineraries, setItineraries] = useState<any>();

  // const fetchItineraryItems = async () => {
  //   const fetchedItineraries = await fetchItineraries();
  //   setItineraries(fetchedItineraries);

  //   fetchedItineraries.map((thiung: any) => console.log(thiung.data[0].trip));
  // };

  const updateItineraries = async () => {
    const fullTrip = [
      {
        id: selectedTrip.id,
        label: {
          icon: "https://picsum.photos/24",
          title: selectedTrip.name,
          subtitle: convertDate(selectedTrip),
        },
        data: [
          {
            id: selectedTrip.tripID,
            startDate: new Date(
              selectedTrip.startDate + selectedTrip.startTime
            ),
            endDate: new Date(selectedTrip.endDate + selectedTrip.endTime),
            occupancy: 3600,
            title: selectedTrip.name,
            description: "Trip",
            bgColor: selectedTrip.color,
          },
        ],
      },
    ];
    if (itineraries) {
      const exam = [
        ...fullTrip,
        ...itineraries.filter(
          (itinerary: any) => itinerary.data[0].trip === selectedTrip.name
        ),
      ];
      setSchedulerData(exam);
      console.log(exam, "exa", selectedTrip.name);
    }
  };

  useEffect(() => {
    console.log(schedulerData, "data", selectedTrip.name);
    updateItineraries();
    setEditItem(null);
  }, [selectedTrip, itineraries]);

  return (
    <div>
      <div className="Trip-content-divs" style={{ border: "none" }}>
        {schedulerData && (
          <CustomScheduler
            // selectedTrip={selectedTrip}
            // itineraryUpdate={itineraryUpdate}
            setEditItem={setEditItem}
            editItem={editItem}
            schedulerData={schedulerData}
            setSchedulerData={setSchedulerData}
          />
        )}
      </div>
      <div>
        <ItineraryControl
          selectedTrip={selectedTrip}
          itineraryUpdate={itineraryUpdate}
          setItineraryUpdate={setItineraryUpdate}
          editItem={editItem}
          // setKey={setKey}
        />
      </div>
    </div>
  );
};

export default Itinerary;
