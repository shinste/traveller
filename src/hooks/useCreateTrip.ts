import React, {
  SetStateAction,
  useRef,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import DatePickerCustom from "../components/DatePickerCustom";
import TextField from "@mui/material/TextField";
import { useAuth } from "../contexts/authContext";
import dayjs, { Dayjs } from "dayjs";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { CirclePicker } from "react-color";
import { useTripsContext } from "../contexts/tripContext";
import { Color, TripData } from "../types";
import updateItems from "../functions/updateItems";

const useCreateTrip = (
  setCreateTrip: (status: string) => void,
  setNewTrip: (id: string) => void,
  createTrip: string
) => {
  const { currentUser } = useAuth();
  const { refresh, updateRefresh } = useTripsContext();
  const tripsRef = collection(db, "trips");
  const [name, setName] = useState("");
  // const nameRef = useRef("");
  const [location, setLocation] = useState("");
  // const locationRef = useRef("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [description, setDescription] = useState("");
  // const descriptionRef = useRef("");
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  // const startTimeRef = useRef<dayjs.Dayjs | null>(null);
  // const endTimeRef = useRef<dayjs.Dayjs | null>(null);
  const [editEvent, setEditEvent] = useState<TripData | undefined>();

  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    // locationRef.current = e.target.value;
  };

  const handleCreate = async () => {
    if (name.length <= 3) {
      setErrorMessage("Please provide a longer name");
    } else if (name.length > 27) {
      setErrorMessage(
        "The maximum number of characters for the trip name is 27."
      );
    } else if (!startDate || !endDate) {
      setErrorMessage(
        "At least one date is invalid, please input a proper date"
      );
    } else if (!color) {
      setErrorMessage("Please choose a color");
    } else if (startDate > endDate) {
      setErrorMessage("Your starting date cannot be after the ending date!");
    } else if (!startTime || !endTime) {
      setErrorMessage("Please select a starting time");
    } else {
      try {
        const newInfo = {
          user: currentUser?.email,
          name: name,
          location: location,
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
          color: color,
          description: currentUser?.email,
          startTime: "T" + startTime.format("HH:mm:ss"),
          endTime: "T" + endTime.format("HH:mm:ss"),
        };
        // Updating an existing event
        if (createTrip && createTrip !== "create") {
          (newInfo as any).id = createTrip;
          updateItems([newInfo], [createTrip], true);
          // Creating a new event
        } else {
          const docRef = await addDoc(tripsRef, newInfo);
          console.log("Document written with ID: ", docRef.id);
          setNewTrip(name);
        }
        updateRefresh(refresh + 1);
        setCreateTrip("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // const handleStartChange = (date: dayjs.Dayjs | null) => {
  //   if (date) {
  //     startDateRef.current = date;
  //   }
  // };

  // const handleEndChange = (date: dayjs.Dayjs | null) => {
  //   if (date) {
  //     endDateRef.current = date;
  //   }
  // };

  const handleStartTimeChange = (date: Dayjs | null) => {
    if (date) {
      setStartTime(date);
    }
  };

  const handleEndTimeChange = (date: Dayjs | null) => {
    if (date) {
      setEndTime(date);
    }
  };

  const handleDescription = (descript: ChangeEvent<HTMLInputElement>) => {
    if (descript) {
      setDescription(descript.target.value);
    }
  };

  const handleChangeColor = (color: Color) => {
    setColor(color.hex);
  };

  const { tripsData } = useTripsContext();

  useEffect(() => {
    if (createTrip && createTrip !== "create") {
      const editEvent: TripData | undefined = tripsData.find(
        (event) => event.id === createTrip
      );
      setEditEvent(editEvent);
      console.log(editEvent);
      if (editEvent) {
        setStartDate(dayjs(editEvent.startDate));
        setEndDate(dayjs(editEvent.endDate));
        setColor(editEvent.color);
        setName(editEvent.name);
        setLocation(editEvent.location);
        setDescription(editEvent.description);
        const today = dayjs().format("YYYY-MM-DD");
        const formattedStart = `${today}${editEvent.startTime}`;
        setStartTime(dayjs(formattedStart));
        const formattedEnd = `${today}${editEvent.endTime}`;
        setEndTime(dayjs(formattedEnd));
      } else {
        // something went wrong error, couldnt find the editing event
      }
    }
  }, [createTrip]);

  const handleUpdate = () => {};

  return {
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    handleCreate,
    handleNameChange,
    handleChangeColor,
    handleLocationChange,
    color,
    errorMessage,
    handleStartTimeChange,
    handleEndTimeChange,
    handleDescription,
    editEvent,
    handleUpdate,
    location,
    name,
    description,
    startTime,
    endTime,
  };
};

export default useCreateTrip;
