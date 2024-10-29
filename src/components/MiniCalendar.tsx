
import { useState } from 'react';
// import Calendar from './Calendar';
import dayjs, { Dayjs } from 'dayjs';

const MiniCalendar = () => {
    const specificDatesToHighlight = [
        dayjs('2024-08-17'),
        dayjs('2024-08-05'),
        dayjs('2024-08-10'),
        dayjs('2024-08-20'),
        dayjs('2024-09-25')
      ];
    return (
        <div>
            {/* <Calendar eventDates={specificDatesToHighlight}/> */}
        </div>
    );
}

export default MiniCalendar;