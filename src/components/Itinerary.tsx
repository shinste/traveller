import dayjs, { Dayjs } from "dayjs";
import { useTripsContext } from "../context";
import { ItineraryItem, ItineraryProps } from "../types";
import getDatesBetween from "../functions/daysBetween";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import isBetween from "dayjs/plugin/isBetween";
import "@bitnoi.se/react-scheduler/dist/style.css";
import CustomScheduler from "./CustomScheduler";
import ItineraryControl from "./ItineraryControl";

const Itinerary: React.FC<ItineraryProps> = ({
  selectedTrip,
  // itineraryUpdate,
  // setItineraryUpdate,
}) => {
  const [editItem, setEditItem] = useState<ItineraryItem>();
  const [keys, setKeys] = useState(0);
  const [itineraryUpdate, setItineraryUpdate] = useState(0);

  return (
    <div>
      <div className="Trip-content-divs" style={{ border: "none" }}>
        <CustomScheduler
          selectedTrip={selectedTrip}
          itineraryUpdate={itineraryUpdate}
          setEditItem={setEditItem}
          editItem={editItem}
          keys={keys}
          setKeys={setKeys}
        />
      </div>
      <div>
        <ItineraryControl
          selectedTrip={selectedTrip}
          itineraryUpdate={itineraryUpdate}
          setItineraryUpdate={setItineraryUpdate}
          editItem={editItem}
          // key={key}
          // setKey={setKey}
        />
      </div>
    </div>
  );
};

export default Itinerary;
