import { Tooltip } from "@mui/material";
import { useTripsContext } from "../contexts/tripContext";
import { DashboardColorsProps } from "../types";
import dayjs from "dayjs";

const DashboardColors: React.FC<DashboardColorsProps> = ({ setDateChosen }) => {
  const { tripsData } = useTripsContext();

  return (
    <div id="Trip-color-div" className="Vertical-flex">
      {tripsData.map((trip, index) => {
        return (
          <Tooltip
            title={
              dayjs(trip.startDate).format("MMMM D, YYYY") +
              " - " +
              dayjs(trip.endDate).format("MMMM D, YYYY")
            }
            placement="right"
            key={index + trip.name}
          >
            <button
              className="Bland-button"
              onClick={() => setDateChosen(trip.startDate)}
            >
              <div className="Flex" key={index}>
                <div
                  className="Circle"
                  style={{ backgroundColor: trip.color }}
                />
                <p id="Dashboard-trip-name">{trip.name}</p>
              </div>
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default DashboardColors;
