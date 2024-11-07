import dayjs, { Dayjs } from "dayjs";
import { useTripsContext } from "../contexts/tripContext";
import { CustomSchedulerProps, ItineraryItem, ItineraryProps } from "../types";
import getDatesBetween from "../functions/daysBetween";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import isBetween from "dayjs/plugin/isBetween";
import "@bitnoi.se/react-scheduler/dist/style.css";
import convertDate from "../functions/convertDate";
import fetchItineraries from "../functions/fetchItineraries";
import { useAuth } from "../contexts/authContext";

const CustomScheduler: React.FC<CustomSchedulerProps> = ({
  setEditItem,
  editItem,
  schedulerData,
  setSchedulerData,
}) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [prevEdit, setPrevEdit] = useState<string | undefined>("");
  // const [filteredData, setFilteredData] = useState<any>(schedulerData);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((range: any) => {
    setRange(range);
  }, []);

  const handleEdit = (item: any) => {
    if (!item.id.includes(currentUser?.email)) {
      setEditItem({
        id: item.id,
        name: item.title,
        startDate: item.startDate,
        endDate: item.endDate,
        trip: item.trip,
      });
    }
  };

  const handleHighlightEdit = () => {
    let newSchedulerData = schedulerData;
    if (prevEdit) {
      newSchedulerData = schedulerData.map((item: any) => {
        if (item.id === prevEdit) {
          item.data[0].bgColor = "#6a7aee";
        }
        return item;
      });
      setPrevEdit("");
    }
    if (editItem && editItem.id !== prevEdit) {
      newSchedulerData = schedulerData.map((item: any) => {
        if (item.id === editItem.id) {
          item.data[0].bgColor = "#00008B";
        }
        return item;
      });
      setPrevEdit(editItem.id);
    } else {
      setEditItem(null);
    }
    setSchedulerData(newSchedulerData);
  };
  // Highlighting and unhighlighting the Itinerary that is being edited
  useEffect(() => {
    handleHighlightEdit();
  }, [editItem]);

  return (
    <div>
      <h1>Day-wise Itinerary</h1>
      <Scheduler
        data={schedulerData}
        isLoading={isLoading}
        // onRangeChange={handleRangeChange}
        // accepts a function to display information
        onTileClick={(clickedResource) => handleEdit(clickedResource)}
        // onItemClick={(item) => handleEdit(item)}
        config={{
          zoom: 1,
          filterButtonState: -1,
          showThemeToggle: true,
        }}
      />
    </div>
  );
};

export default CustomScheduler;
