import React, { SetStateAction, useEffect, useState } from "react";
import convertDate from "../functions/convertDate";
import { useTripsContext } from "../contexts/tripContext";
import ToDoList from "./ToDoList";
import Itinerary from "./Itinerary";
import fetchItineraries from "../functions/fetchItineraries";

interface TripDashboardProps {
  highlight: number;
}

const TripDashboard: React.FC<TripDashboardProps> = ({ highlight }) => {
  const { tripsData } = useTripsContext();
  const [itineraryUpdate, setItineraryUpdate] = useState(0);
  const [itineraries, setItineraries] = useState<any>();
  const fetchItineraryItems = async () => {
    const fetchedItineraries = await fetchItineraries();
    setItineraries(fetchedItineraries);
    console.log(fetchedItineraries, "itineraries");
  };

  useEffect(() => {
    fetchItineraryItems();
    console.log("fetching itineraries");
  }, [itineraryUpdate]);

  if (tripsData.length === 0) {
    return <div></div>;
  }
  return (
    <div id="Trip-dashboard">
      <div id="Headboard">
        <div className="Vertical-flex Vert-align">
          <div id="Headboard-div">
            <p id="Trip-name-headboard">{tripsData[highlight].name} </p>
            <p id="Trip-date-headboard">{convertDate(tripsData[highlight])}</p>
          </div>
        </div>
      </div>
      <div className="Flex">
        <div id="Entire-itinerary">
          <h3>Day-wise Intinerary</h3>
          <Itinerary
            selectedTrip={tripsData[highlight]}
            itineraries={itineraries}
            itineraryUpdate={itineraryUpdate}
            setItineraryUpdate={setItineraryUpdate}
          />
        </div>

        <ToDoList selectedTrip={tripsData[highlight]} />
      </div>
    </div>
  );
};

export default TripDashboard;
