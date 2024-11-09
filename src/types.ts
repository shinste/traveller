import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  ChangeEvent,
  MutableRefObject,
  RefObject,
  SetStateAction,
} from "react";

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
  selectedTripId: string;
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
  value: Dayjs | null;
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
  dateChosen: any;
  originalEventDates: any;
}

export interface ConflictDisplayProps {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  color: string | null;
}

export interface StartConflicts {
  name: string;
  date: string;
}

export interface DateDisplayProps {
  dateDisplay: string;
}

export interface OverlapConflicts {
  [key: string]: string[];
}

export interface TripListerProps {
  newTrip: string;
  highlight: number;
  setHighlight: React.Dispatch<React.SetStateAction<number>>;
  setCreateTrip: React.Dispatch<React.SetStateAction<string>>;
}

export interface TripFormProps {
  createTrip: string;
  setCreateTrip: React.Dispatch<SetStateAction<string>>;
  setNewTrip: React.Dispatch<SetStateAction<string>>;
}

export interface Color {
  hex: string;
}
