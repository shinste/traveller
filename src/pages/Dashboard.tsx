import NavBar from '../components/NavBar'
import MiniCalendar from '../components/MiniCalendar';
import * as CONSTANTS from '../constants/navBar'
import DashboardColors from '../components/DashboardColors';
import useTrips from '../hooks/useTrips';
const Dashboard = () => {
    useTrips();
    

    return (
        <div className='Page-default'>
            <div id="Dashboard-main-div">
                <NavBar page={CONSTANTS.TITLE_DASHBOARD}/>
                <div id="Dashboard-side-div">
                    <MiniCalendar />
                    <DashboardColors />
                </div>
            </div>

            
        </div>
    );
}

export default Dashboard;