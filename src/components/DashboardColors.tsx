import { useTripsContext } from "../contexts/tripContext";
import { DashboardColorsProps } from "../types";
import TripDashboard from "./TripDashboard";

const DashboardColors: React.FC<DashboardColorsProps> = ({ setDateChosen }) => {
  const { tripsData } = useTripsContext();

  return (
    <div id="Trip-color-div" className="Vertical-flex">
      {tripsData.map((trip, index) => {
        return (
          <button
            key={index + trip.name}
            className="Bland-button"
            onClick={() => setDateChosen(trip.startDate)}
          >
            <div className="Flex" key={index}>
              <div className="Circle" style={{ backgroundColor: trip.color }} />
              <p id="Dashboard-trip-name">{trip.name}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DashboardColors;
