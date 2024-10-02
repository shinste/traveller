import React, { SetStateAction, useRef, ChangeEvent, useState, useEffect } from "react";
import DatePickerCustom from "../components/DatePickerCustom";
import TextField from '@mui/material/TextField';
import { useAuth } from "../contexts/authContext";
import dayjs from "dayjs";
import { db } from '../firebase/firebase'
import { addDoc, collection } from "firebase/firestore";
import { CirclePicker } from 'react-color';
import { useTripsContext } from "../context";
import useCreateTrip from "../hooks/useCreateTrip";

interface TripFormProps {
    setCreateTrip: React.Dispatch<SetStateAction<boolean>>
    setNewTrip: React.Dispatch<SetStateAction<string>>
}
const TripForm: React.FC<TripFormProps> = ({setCreateTrip, setNewTrip}) => {
    
    const { 
        handleStartChange, handleEndChange, handleCreate, handleNameChange, handleChangeColor, handleLocationChange,
        color, errorMessage
    } = useCreateTrip(setCreateTrip, setNewTrip);

    return (
        <div id="Trip-form-div">
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleCreate}>
                <div className="Vertical-flex">
                    <h4>Description</h4>
                    <div id="Name-div" className="Padding-hori">
                        <div className="Vertical-flex">
                            <TextField id="outlined-basic" className="mb-3" variant="outlined" required onChange={handleNameChange} sx={{width: '20rem'}} label="Name of Trip"/>
                            <TextField id="outlined-basic" variant="outlined" onChange={handleLocationChange} sx={{width: '20rem'}} label="Location of Trip"/>
                        </div>
                        
                        <CirclePicker color={color} onChangeComplete={handleChangeColor}/>
                    </div>
                </div>
                <div className="Vertical-flex">
                    <h4>Date & Time</h4>
                    <div id="Date-pickers" className="Padding-hori">
                        <DatePickerCustom label="Start Date" onChange={handleStartChange}/>
                        <DatePickerCustom label="End Date" onChange={handleEndChange}/>
                    </div>
                    <button type="button" onClick={handleCreate}>Create</button>
                </div>
            </form>
            <button onClick={() => setCreateTrip(false)}>Cancel</button>

        </div>
    )
}

export default TripForm;