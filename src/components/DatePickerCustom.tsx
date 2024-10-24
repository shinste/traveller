import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePickerProps } from "../types";

const DatePickerCustom: React.FC<DatePickerProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          onChange={onChange}
          value={value}
          sx={{ paddingTop: 0, width: "15rem", flexGrow: 0 }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerCustom;
