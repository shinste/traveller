import { useState } from "react";
import TripForm from "./TripForm";
import TripLister from "./TripLister";
import TripDashboard from "./TripDashboard";
import { useTripsContext } from "../context";

const TripsDisplay = () => {
  const [createTrip, setCreateTrip] = useState(false);
  const [newTrip, setNewTrip] = useState("");
  const [highlight, setHighlight] = useState(0);
  const { tripsData } = useTripsContext();
  // useFetchTrips(newTrip);

  return (
    <div className="Flex" style={{ height: "78vh" }}>
      <TripLister
        newTrip={newTrip}
        highlight={highlight}
        setHighlight={setHighlight}
        setCreateTrip={setCreateTrip}
      />
      {createTrip ? (
        <TripForm setCreateTrip={setCreateTrip} setNewTrip={setNewTrip} />
      ) : (
        tripsData.length > 0 && <TripDashboard highlight={highlight} />
      )}
    </div>
  );
};

export default TripsDisplay;
