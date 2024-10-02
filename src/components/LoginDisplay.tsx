import { useEffect, useState } from "react";
import LoginTrip from "./LoginTrip";
import useMove from "../hooks/useMove";

const LoginDisplay = () => {
    useMove();
    return (
        <div id="loginDisplayDiv">
            <div className="Center-div">
                <h1 id="Login-title" className="Vertical-center">Traveller.</h1>
            </div>
            <LoginTrip location={'Italy'} left={'10%'} bottom={'10%'} />
            <LoginTrip location={'Cruise'} left={'20%'} bottom={'70%'}/>
            <LoginTrip location={'London'} left={'30%'} bottom={'20%'}/>
            <LoginTrip location={'Japan'} left={'40%'} bottom={'73%'} />  
            <LoginTrip location={'Canada'} left={'41%'} bottom={'23%'} />  
            <LoginTrip location={'Vietnam'} left={'43%'} bottom={'83%'} /> 
            <LoginTrip location={'Zoo'} left={'50%'} bottom={'30%'} />
            <LoginTrip location={'Camping'} left={'56%'} bottom={'80%'} />
            <LoginTrip location={'Canada'} left={'58%'} bottom={'23%'} /> 
            <LoginTrip location={'Skiing'} left={'60%'} bottom={'50%'} />
            <LoginTrip location={'Korea'} left={'70%'} bottom={'60%'}/>
            <LoginTrip location={'Hiking'} left={'80%'} bottom={'30%'}/>
        </div>
    );
}

export default LoginDisplay;