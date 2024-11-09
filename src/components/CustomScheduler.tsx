import { CustomSchedulerProps, ItineraryItem, ItineraryProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { useAuth } from "../contexts/authContext";
import useMaintainEditItinerary from "../hooks/useMaintainEditItinerary";

const CustomScheduler: React.FC<CustomSchedulerProps> = ({
  setEditItem,
  editItem,
  schedulerData,
  setSchedulerData,
}) => {
  const { handleEdit } = useMaintainEditItinerary(
    setEditItem,
    editItem,
    schedulerData,
    setSchedulerData
  );
  return (
    <div>
      <h1>Day-wise Itinerary</h1>
      <Scheduler
        data={schedulerData}
        onTileClick={(clickedResource) => handleEdit(clickedResource)}
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
