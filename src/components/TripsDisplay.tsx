import { useState } from "react";
import TripForm from "./TripForm";
import TripLister from "./TripLister";
import TripDashboard from "./TripDashboard";
import { useTripsContext } from "../contexts/tripContext";

const TripsDisplay = () => {
  const [createTrip, setCreateTrip] = useState("");
  const [newTrip, setNewTrip] = useState("");
  const [highlight, setHighlight] = useState(0);
  const { tripsData } = useTripsContext();

  return (
    <div className="Flex" style={{ height: "78vh" }}>
      <TripLister
        newTrip={newTrip}
        highlight={highlight}
        setHighlight={setHighlight}
        setCreateTrip={setCreateTrip}
      />
      {createTrip ? (
        <TripForm
          createTrip={createTrip}
          setCreateTrip={setCreateTrip}
          setNewTrip={setNewTrip}
        />
      ) : (
        tripsData.length > 0 && <TripDashboard highlight={highlight} />
      )}
    </div>
  );
};

export default TripsDisplay;
