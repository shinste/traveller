import { useTripsContext } from "../context";
import TripDashboard from "./TripDashboard";

const DashboardColors = () => {

    const { tripsData } = useTripsContext();

    return (
        <div id="Trip-color-div">
            {tripsData.map((trip, index) => {
                return (
                    <div className="Flex" key={index}>
                        <div className="Circle" style={{backgroundColor: trip.color}} />
                        <p id="Dashboard-trip-name">{trip.name}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default DashboardColors;