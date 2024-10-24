import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
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

export interface DashboardColorsProps {
  setDateChosen: (dateChosen: string) => void;
}

export interface ItineraryProps {
  selectedTrip: TripData;
  // itineraryUpdate: number;
  // setItineraryUpdate: (update: number) => void;
}

export interface CustomSchedulerProps {
  selectedTrip: TripData;
  itineraryUpdate: number;
  setEditItem: (item: ItineraryItem) => void;
  editItem: ItineraryItem | undefined;
  keys: number;
  setKeys: (key: number) => void;
}

export interface ItineraryControlProps {
  selectedTrip: TripData;
  itineraryUpdate: number;
  setItineraryUpdate: (update: number) => void;
  editItem: ItineraryItem | undefined;
  // key: number;
  // setKey: (key: number) => void;
}

export interface ItineraryItem {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  trip: string;
}

export interface DatePickerProps {
  label: string;
  onChange:
    | ((
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  value: Dayjs | null;
}
