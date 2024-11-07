import { DateDisplayProps } from "../types";

const DateDisplay: React.FC<DateDisplayProps> = ({ dateDisplay }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[Number(dateDisplay.slice(5, 7)) - 1];
  const day =
    dateDisplay.slice(8, 10)[0] === "0"
      ? dateDisplay.slice(9, 10)
      : dateDisplay.slice(8, 10);
  return (
    <div id="Display-date">
      <p className="Margin-center" id="Display-date-month">
        {month}
      </p>
      <p className="Margin-center" id="Display-date-day">
        {day}
      </p>
    </div>
  );
};

export default DateDisplay;
