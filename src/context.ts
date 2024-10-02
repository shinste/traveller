import { createContext, useContext } from "react";
import { TripData, TripsContextType } from "./types";

export const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const useTripsContext = () => {
    const context = useContext(TripsContext);
    if (!context) {
      throw new Error('useTripsContext must be used within a TripsProvider');
    }
    return context;
  };