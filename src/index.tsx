import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TripData } from './types';
import { TripsContext } from './context';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main = () => {
  const [tripsData, setTripsData] = useState<TripData[]>([])
  const [refresh, setRefresh] = useState(0);
  const updateTrips = (newTrips: TripData[]) => {
    setTripsData(newTrips);
  };
  const updateRefresh = (newRefresh: number) => {
    setRefresh(newRefresh);
  }

  return (
    <TripsContext.Provider value={{ tripsData, updateTrips, refresh, updateRefresh }}>
      <App />
    </TripsContext.Provider>
  );
};



root.render(
  <Main />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
