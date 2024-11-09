import { CustomSchedulerProps, ItineraryItem, ItineraryProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { useAuth } from "../contexts/authContext";

const useMaintainEditItinerary = (
  setEditItem: (item: ItineraryItem | null) => void,
  editItem: ItineraryItem | undefined | null,
  schedulerData: any,
  setSchedulerData: (schedulerData: any) => void
) => {
  const { currentUser } = useAuth();
  const [prevEdit, setPrevEdit] = useState<string | undefined>("");

  // Selecting the itinerary item that user clicks
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

  // Highlighting the itinerary item that is currently being edited
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

  return { handleEdit };
};

export default useMaintainEditItinerary;
