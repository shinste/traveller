import dayjs from "dayjs"
import { TripData } from "../types";


const convertDate = (trip: TripData) => {
    let formattedDate = dayjs(trip.startDate).format('MMMM D, YYYY')
    if (trip.endDate && trip.endDate !== trip.startDate) {
        formattedDate += ' - ' + dayjs(trip.endDate).format('MMMM D, YYYY');
    }
    return formattedDate;
}

export default convertDate;