import NavBar from "../components/NavBar";
import * as CONSTANTS from '../constants/navBar';
const Calendar = () => {
    return (
        <div className='Page-default'>
            <NavBar page={CONSTANTS.TITLE_CALENDAR}/>
        </div>
    )
}

export default Calendar;