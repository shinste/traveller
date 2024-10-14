import { Dayjs } from "dayjs";
import { ChangeEvent, MutableRefObject, RefObject } from "react";

export interface TripData {
  id: string;
  name: string;
  user: string;
  location: string;
  color: string;
  tripID: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface TripsContextType {
  tripsData: TripData[];
  updateTrips: (newTrips: TripData[]) => void;
  refresh: number;
  updateRefresh: (updater: number) => void;
}

export interface ToDoData {
  id: string;
  tripID: string;
  user: string;
  description: string;
  status: string;
  deadline: string;
  checked: boolean;
}

export interface BasicDateProps {
  defaultValue: Dayjs;
  setDate: (newDate: Dayjs) => void;
}

export interface DropDownProps {
  defaultStatus: string;
  setNewStatus: (newStatus: string) => void;
}

export interface NewToDoProps {
  setNewToDo: (newToDo: boolean) => void;
  selectedTripName: string;
  setUpdate: (update: string) => void;
}

export interface TripEvent {
  id: number;
  text: string;
  start: string;
  end: string;
  backColor: string;
  participants: number;
}

export interface CustomTimePickerProps {
  change: (date: Dayjs | null) => void;
  label: string;
}
