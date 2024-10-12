import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomTimePickerProps } from "../types";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  change,
  label,
}) => {
  //   const [time, setTime] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          sx={{
            width: "15rem",
            marginTop: "1rem",
            flexGrow: 1,
          }}
          onChange={(event) => change(event)}
          label={label}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomTimePicker;
