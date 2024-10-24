import React, { SetStateAction, useEffect, useState } from "react";
import convertDate from "../functions/convertDate";
import { useTripsContext } from "../context";
import ToDoList from "./ToDoList";
import Itinerary from "./Itinerary";

interface TripDashboardProps {
  highlight: number;
}

const TripDashboard: React.FC<TripDashboardProps> = ({ highlight }) => {
  const { tripsData } = useTripsContext();
  //   const [toDoNumber, setToDoNumber] = useState(0);
  if (tripsData.length === 0) {
    return <div></div>;
  }
  return (
    <div id="Trip-dashboard">
      <div
        id="Headboard"
        // style={{ backgroundColor: tripsData[highlight].color }}
      >
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
          <Itinerary selectedTrip={tripsData[highlight]} />
        </div>

        <ToDoList selectedTrip={tripsData[highlight]} />
      </div>
    </div>
  );
};

export default TripDashboard;
