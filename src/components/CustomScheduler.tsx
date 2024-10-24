import dayjs, { Dayjs } from "dayjs";
import { useTripsContext } from "../context";
import { CustomSchedulerProps, ItineraryItem, ItineraryProps } from "../types";
import getDatesBetween from "../functions/daysBetween";
import { useCallback, useEffect, useState } from "react";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import isBetween from "dayjs/plugin/isBetween";
import "@bitnoi.se/react-scheduler/dist/style.css";
import convertDate from "../functions/convertDate";
import fetchItineraries from "../functions/fetchItineraries";

const CustomScheduler: React.FC<CustomSchedulerProps> = ({
  selectedTrip,
  itineraryUpdate,
  setEditItem,
  editItem,
  keys,
  setKeys,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [keys, setKeys] = useState(0);
  const [schedulerData, setSchedulerData] = useState([
    {
      id: selectedTrip.id,
      label: {
        icon: "https://picsum.photos/24",
        title: selectedTrip.name,
        subtitle: convertDate(selectedTrip),
      },
      data: [
        {
          id: selectedTrip.tripID,
          startDate: new Date(selectedTrip.startDate + selectedTrip.startTime),
          endDate: new Date(selectedTrip.endDate + selectedTrip.endTime),
          occupancy: 3600,
          title: selectedTrip.name,
          description: "Trip",
          bgColor: selectedTrip.color,
        },
      ],
    },
  ]);
  const [filteredData, setFilteredData] = useState<any>(schedulerData);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((range: any) => {
    setRange(range);
  }, []);

  const handleItineraries = async () => {
    const Itineraries = await fetchItineraries(selectedTrip.name);
    setSchedulerData([
      ...schedulerData,
      ...Itineraries.filter(
        (itinerary: any) =>
          !schedulerData.some(
            (schedulerItem) => schedulerItem.id === itinerary.id
          )
      ),
    ]);
    // setKeys(keys + 1);
  };

  const handleEdit = (item: any) => {
    console.log(item, "check");
    if (item.description !== "Trip") {
      setEditItem({
        id: item.id,
        name: item.title,
        startDate: item.startDate,
        endDate: item.endDate,
        trip: item.trip,
      });
    }
    console.log(filteredData, "highlght");
    // Highlighting the Itinerary that is being edited
    if (editItem) {
      setSchedulerData(
        schedulerData.map((item) => {
          if (item.id === editItem.id) {
            item.data[0].bgColor = "#00008B";
          }
          return item;
        })
      );
    } else {
      //"#6a7aee"
    }
  };

  // To highlight the itinerary item that is being edited and unhighlight

  useEffect(() => {
    handleItineraries();
  }, [itineraryUpdate]);

  // useEffect(() => {
  //   setKeys(keys + 1);
  //   console.log(selectedTrip.name);
  // }, [selectedTrip]);

  useEffect(() => {
    setFilteredData(
      schedulerData.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            // we use "dayjs" for date calculations, but feel free to use library of your choice
            dayjs(project.startDate).isBetween(
              range.startDate,
              range.endDate
            ) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        ),
      }))
    );
  }, [schedulerData]);
  return (
    <div>
      <h1>Day-wise Itinerary</h1>
      <Scheduler
        key={keys}
        data={filteredData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
        // accepts a function to display information
        onTileClick={(clickedResource) => handleEdit(clickedResource)}
        onItemClick={(item) => handleEdit(item)}
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
