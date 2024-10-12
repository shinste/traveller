import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  PickerChangeHandlerContext,
  DateValidationError,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface DatePickerProps {
  label: string;
  onChange:
    | ((
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
}

const DatePickerCustom: React.FC<DatePickerProps> = ({ label, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          onChange={onChange}
          sx={{ paddingTop: 0, width: "15rem", flexGrow: 0 }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerCustom;
