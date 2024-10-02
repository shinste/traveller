import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DropDownProps } from "../types";

const DropDown: React.FC<DropDownProps> = ({ defaultStatus, setNewStatus }) => {
  const [status, setStatus] = React.useState(defaultStatus);
  const handleChange = (event: SelectChangeEvent) => {
    setNewStatus(event.target.value as string);
    setStatus(event.target.value as string);
  };

  const statusColors: { [key: string]: string } = {
    Optional: "orange",
    Necessary: "green",
    Urgent: "red",
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <Select
          id="demo-simple-select"
          value={defaultStatus}
          onChange={handleChange}
          sx={{ color: statusColors[status] }}
        >
          <MenuItem style={{ color: "orange" }} value={"Optional"}>
            Optional
          </MenuItem>
          <MenuItem style={{ color: "green" }} value={"Necessary"}>
            Necessary
          </MenuItem>
          <MenuItem style={{ color: "red" }} value={"Urgent"}>
            Urgent
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
