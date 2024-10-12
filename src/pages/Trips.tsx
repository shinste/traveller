import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TripsDisplay from "../components/TripsDisplay";
import * as CONSTANTS from "../constants/navBar";
import useTrips from "../hooks/useTrips";

const Trips = () => {
  useTrips();
  return (
    <div className="Page-default">
      <NavBar page={CONSTANTS.TITLE_TRIPS} />
      <div className="Main-padding">
        <TripsDisplay />
      </div>
    </div>
  );
};

export default Trips;
