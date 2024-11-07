import { useEffect, useState } from "react";
import { useTripsContext } from "../contexts/tripContext";
import {
  ConflictDisplayProps,
  OverlapConflicts,
  StartConflicts,
  TripData,
} from "../types";
import findOverlap from "../functions/findOverlap";
import DateDisplay from "./DateDisplay";

const ConflictDisplay: React.FC<ConflictDisplayProps> = ({
  startDate,
  endDate,
  color,
}) => {
  const { tripsData } = useTripsContext();
  const [startConflicts, setStartConflicts] = useState<StartConflicts[]>();
  const [overlapConflicts, setOverlapConflicts] = useState<OverlapConflicts>();
  const [colorConflicts, setColorConflicts] = useState<string[]>();

  const scanStart = () => {
    let filteredList: any = tripsData.filter(
      (trip) => trip.startDate === startDate?.format("YYYY-MM-DD")
    );
    if (filteredList && filteredList.length > 0) {
      filteredList = filteredList.map((trip: TripData) => {
        return {
          name: trip.name,
          date: trip.startDate,
        };
      });
      setStartConflicts(filteredList);
    } else {
      setStartConflicts([]);
    }
  };

  const scanOverlap = () => {
    if (startDate && endDate) {
      const overlapObject: OverlapConflicts = {};
      tripsData.forEach((event) => {
        const overlapDays = findOverlap(
          startDate,
          endDate,
          event.startDate,
          event.endDate
        );
        if (overlapDays && overlapDays.length > 0) {
          overlapObject[event.name] = overlapDays;
        }
      });
      setOverlapConflicts(overlapObject);
      console.log(overlapObject);
    }
  };

  const scanColor = () => {
    if (color) {
      const filteredData = tripsData.filter((event) => event.color === color);
      if (filteredData.length > 0) {
        setColorConflicts(
          filteredData.map((event) => {
            return event.name;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (startDate) {
      scanStart();
      if (endDate) {
        scanOverlap();
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    scanColor();
    console.log(color);
  }, [color]);

  return (
    <div id="Conflict-div">
      <p className="Form-title">Event Conflicts</p>
      <div className="Vertical-flex">
        <p className="Conflict-headers">Same Start Date:</p>
        <div className="Conflict-type-div">
          <div className="Conflict-flex-div">
            {startConflicts ? (
              startConflicts.map((event, index) => {
                return (
                  <div
                    className="Flex Center-div"
                    key={"start" + event.name + index}
                  >
                    <DateDisplay dateDisplay={event.date} />
                    <p className="Display-event-name">{event.name}</p>
                  </div>
                );
              })
            ) : (
              <p>
                There are currently no start date conflicts with this event!
              </p>
            )}
          </div>
        </div>
        <p className="Conflict-headers">Overlapping Events:</p>
        <div className="Overlap-div">
          <div className="Vertical-flex Conflict-flex-div">
            {overlapConflicts ? (
              Object.entries(overlapConflicts).map(([key, value], index) => {
                return (
                  <div className="my-2" key={"overlap" + key + index}>
                    <p className="m-0">{key}</p>
                    <div className="Flex">
                      {value.map((date) => {
                        return (
                          <div className="margin-right-1">
                            <DateDisplay dateDisplay={date} />{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>
                There are currently no overlapping conflicts with this event!
              </p>
            )}
          </div>
        </div>
        <p className="Conflict-headers">Same Colors:</p>

        <div className="Conflict-type-div">
          <div className="Conflict-flex-div">
            {colorConflicts ? (
              colorConflicts.map((event, index) => {
                return (
                  <div key={"color" + index + event}>
                    <p>{event}</p>
                  </div>
                );
              })
            ) : (
              <p>
                There are currently no overlapping conflicts with this event!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictDisplay;
