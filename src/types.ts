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
  id: string;
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
  itineraries: any;
  itineraryUpdate: number;
  setItineraryUpdate: (update: number) => void;
}

export interface CustomSchedulerProps {
  // selectedTrip: TripData;
  // itineraryUpdate: number;
  setEditItem: (item: ItineraryItem | null) => void;
  editItem: ItineraryItem | undefined | null;
  schedulerData: any;
  setSchedulerData: (schedulerData: any) => void;
}

export interface SchedulerDataProps {
  id: string;
  label: {
    icon: string;
    title: string;
    subtitle: string;
  };
  data: {
    id: string;
    startDate: Date;
    endDate: Date;
    occupancy: number;
    title: string;
    description: string;
    bgColor: string;
  }[];
}
[];

export interface SchedulerItem {
  id: string;
  startDate: Date;
  endDate: Date;
  occupancy: number;
  title: string;
  description: string;
  bgColor: string;
}

export interface ItineraryControlProps {
  selectedTrip: TripData;
  itineraryUpdate: number;
  setItineraryUpdate: (update: number) => void;
  editItem: ItineraryItem | undefined | null;
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

export interface CalendarProps {
  events: TripEvent[];
  setDateChosen: (dateChosen: any) => void;
  dateChosen: any
  originalEventDates: any
}