import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const initialValue = dayjs('2024-08-16');

// Define your specific dates to highlight


function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDates?: Dayjs[] }) {
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDates.some(highlightedDate => day.isSame(highlightedDate, 'day'));

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <div className='badge'><p>o</p></div> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

interface CalendarProps {
    eventDates: Dayjs[]
}
const Calendar: React.FC<CalendarProps> = ({eventDates}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDates, setHighlightedDates] = React.useState(eventDates);

  const handleMonthChange = (date: Dayjs) => {
    // Optionally, update highlightedDates based on the new month.
    setIsLoading(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDates,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
