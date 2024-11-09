import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomTimePickerProps } from "../types";

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  change,
  label,
  value,
}) => {
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
          value={value}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomTimePicker;
