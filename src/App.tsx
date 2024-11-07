import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./contexts/authContext";
import "./App.css";
import Trips from "./pages/Trips";
import Calendar from "./pages/Calendar";
import { TripData } from "./types";
import fetchTrips from "./functions/fetchTrips";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/trips" element={<Trips />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
