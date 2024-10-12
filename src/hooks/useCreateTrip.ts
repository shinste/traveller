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
import { useTripsContext } from "../context";

const useCreateTrip = (
  setCreateTrip: (status: boolean) => void,
  setNewTrip: (id: string) => void
) => {
  const { currentUser } = useAuth();
  const { refresh, updateRefresh } = useTripsContext();
  const tripsRef = collection(db, "trips");
  const nameRef = useRef("");
  const locationRef = useRef("");
  const startDateRef = useRef<dayjs.Dayjs | null>(null);
  const endDateRef = useRef<dayjs.Dayjs | null>(null);
  const descriptionRef = useRef("");
  const startTimeRef = useRef<dayjs.Dayjs | null>(null);
  const endTimeRef = useRef<dayjs.Dayjs | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("#f44336");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    nameRef.current = e.target.value;
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    locationRef.current = e.target.value;
  };

  const handleCreate = async () => {
    if (nameRef.current.length <= 3) {
      setErrorMessage("Please provide a longer name");
    } else if (nameRef.current.length > 27) {
      setErrorMessage(
        "The maximum number of characters for the trip name is 27."
      );
    } else if (!startDateRef.current || !endDateRef.current) {
      setErrorMessage(
        "At least one date is invalid, please input a proper date"
      );
    } else if (!color) {
      setErrorMessage("Please choose a color");
    } else if (startDateRef.current > endDateRef.current) {
      setErrorMessage("Your starting date cannot be after the ending date!");
    } else {
      try {
        const docRef = await addDoc(tripsRef, {
          tripID: currentUser?.email + nameRef.current,
          user: currentUser?.email,
          name: nameRef.current,
          location: locationRef.current,
          startDate: startDateRef.current?.format("YYYY-MM-DD"),
          endDate: endDateRef.current?.format("YYYY-MM-DD"),
          color: color,
          description: descriptionRef,
          startTime: startTimeRef,
          endTime: endTimeRef,
        });
        console.log("Document written with ID: ", docRef.id);
        updateRefresh(refresh + 1);
        setCreateTrip(false);
        setNewTrip(nameRef.current);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleStartChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      startDateRef.current = date;
    }
  };

  const handleEndChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      endDateRef.current = date;
    }
  };

  const handleStartTimeChange = (date: Dayjs | null) => {
    if (date) {
      startTimeRef.current = date;
    }
  };

  const handleEndTimeChange = (date: Dayjs | null) => {
    if (date) {
      endTimeRef.current = date;
    }
  };
  interface Color {
    hex: string;
  }
  const handleChangeColor = (color: Color) => {
    setColor(color.hex);
  };

  return {
    handleStartChange,
    handleEndChange,
    handleCreate,
    handleNameChange,
    handleChangeColor,
    handleLocationChange,
    color,
    errorMessage,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};

export default useCreateTrip;
