import { db } from "../firebase/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  Query,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTripsContext } from "../contexts/tripContext";
import deleteEntry from "../functions/deleteEntry";
import { TripData } from "../types";

interface TripListerProps {
  newTrip: string;
  highlight: number;
  setHighlight: React.Dispatch<React.SetStateAction<number>>;
  setCreateTrip: React.Dispatch<React.SetStateAction<boolean>>;
}

const TripLister: React.FC<TripListerProps> = ({
  newTrip,
  highlight,
  setHighlight,
  setCreateTrip,
}) => {
  const handleTripClick = (index: number) => {
    setHighlight(index);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>();

  const { tripsData, refresh, updateRefresh } = useTripsContext();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tripId: TripData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrip(tripId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTrip = (id: string) => {
    deleteEntry([id], "trips");
    setTimeout(function () {
      updateRefresh(refresh + 1);
    }, 5000);
    updateRefresh(refresh + 1);
    setDialog(false);
    setAnchorEl(null);
  };

  return (
    <div id="Trip-lister-div">
      <div className="Flex-space">
        <h1 style={{ marginLeft: "1rem" }}>Trips</h1>
        <div id="New-trip-div" onClick={() => setCreateTrip(true)}>
          <p className="p New-trip m-1">Create Trip</p>
          <AddCircleIcon />
        </div>
      </div>

      <div id="Hold-trips">
        {tripsData.map((trip, index) => {
          return (
            // <div>
            //   <button className="Bland-button">
            <div
              key={index}
              className="Each-trip Flex-space"
              style={{
                border: `2px ${trip.color} solid`,
                borderWidth: highlight === index ? "5px" : "2px",
                boxShadow:
                  highlight === index
                    ? `inset 0 0 10px ${trip.color}`
                    : undefined,
              }}
            >
              <button className="Bland-button Width-100">
                <div className="Flex Justify-betweens">
                  <div
                    style={{ overflowX: "hidden" }}
                    onClick={() => handleTripClick(index)}
                  >
                    <div id="Holding-trip-name">
                      <p id="Trip-name">
                        {trip.name}
                        {trip.name === newTrip && (
                          <p className="Superscript-text">NEW</p>
                        )}
                      </p>
                    </div>
                    <p id="Trip-date">
                      {dayjs(trip.startDate).format("MMMM D, YYYY")}
                      {trip.endDate &&
                        trip.endDate !== trip.startDate &&
                        " - " + dayjs(trip.endDate).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, trip)}
                        sx={{
                          minHeight: 0,
                          minWidth: 0,
                          padding: 0,
                          color: "black",
                        }}
                      >
                        <SettingsSharpIcon />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Share</MenuItem>
                        <MenuItem onClick={() => setDialog(true)}>
                          Delete
                        </MenuItem>
                      </Menu>
                      <Dialog
                        open={dialog}
                        onClose={() => {
                          setDialog(false);
                          handleClose();
                        }}
                      >
                        <div id="Delete-div">
                          <h4>
                            Are you sure you'd like to delete the trip "
                            {selectedTrip && selectedTrip.name}
                            "?
                          </h4>
                          <div id="Delete-buttons">
                            <Button onClick={() => setDialog(false)}>
                              Cancel
                            </Button>
                            <Button
                              color="error"
                              onClick={() =>
                                selectedTrip &&
                                handleDeleteTrip(selectedTrip.id)
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripLister;
