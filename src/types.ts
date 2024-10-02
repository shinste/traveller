import { Dayjs } from "dayjs";

export interface TripData {
  id: string;
  name: string;
  user: string;
  location: string;
  color: string;
  tripID: string;
  startDate: string;
  endDate?: string;
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
