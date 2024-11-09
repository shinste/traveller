import { ItineraryProps } from "../types";
import "@bitnoi.se/react-scheduler/dist/style.css";
import CustomScheduler from "./CustomScheduler";
import ItineraryControl from "./ItineraryControl";
import useUpdateItineraries from "../hooks/useUpdateItineraries";

const Itinerary: React.FC<ItineraryProps> = ({
  selectedTrip,
  itineraries,
  itineraryUpdate,
  setItineraryUpdate,
}) => {
  const { schedulerData, setSchedulerData, editItem, setEditItem } =
    useUpdateItineraries(selectedTrip, itineraries);

  return (
    <div>
      <div className="Trip-content-divs" style={{ border: "none" }}>
        {schedulerData && (
          <CustomScheduler
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
        />
      </div>
    </div>
  );
};

export default Itinerary;
