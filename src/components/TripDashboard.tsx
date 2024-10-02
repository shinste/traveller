import React, { SetStateAction, useEffect } from "react";
import convertDate from "../functions/convertDate";
import { useTripsContext } from "../context";
import ToDoList from "./ToDoList";
import Itinerary from "./Itinerary";


interface TripDashboardProps {
    highlight: number
}


const TripDashboard: React.FC<TripDashboardProps> = ({ highlight }) => {
    const { tripsData } = useTripsContext();
    if (tripsData.length === 0) {
        return <div></div>
    }
    return (
        <div id="Trip-dashboard">
            <div id="Headboard" style={{backgroundColor: tripsData[highlight].color}}>
                <div className="Vertical-flex Vert-align">
                    <div id="Headboard-div">
                        <p id="Trip-name-headboard">{tripsData[highlight].name} </p>
                        <p id="Trip-date-headboard">{convertDate(tripsData[highlight])}</p>
                    </div>
                    <div id="Headboard-extra-div">          
                        <p className="Headboard-extras"><span style={{fontSize: '35px', fontWeight: 'bold'}}>5</span> To Dos</p>          
                        <p className="Headboard-extras" ><span style={{fontSize: '35px', fontWeight: 'bold'}}>3</span> Itinerary Items</p>
                    </div>
                </div>
            </div>
            <div className="Flex">
                <ToDoList selectedTrip={tripsData[highlight]}/>
                <Itinerary />
            </div>
            
        </div>
    );
}

export default TripDashboard;