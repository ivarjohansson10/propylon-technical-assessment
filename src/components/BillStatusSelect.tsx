import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";


/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  handleChange: (type: string) => void;
}

/* -----------------------------------
 *
 * BillStatusSelect
 *
 * -------------------------------- */

const BillStatusSelect = ({ handleChange }: IProps) => {
  const [type, setType] = React.useState("");

  useEffect(() => {
    handleChange(type);
  }, [type, handleChange]);

  const change = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth variant="filled">
        <InputLabel>Filter by Bill Status</InputLabel>
        <Select
          fullWidth
          value={type}
          label="Bill Status"
          onChange={(event) => change(event)}
        >
          <MenuItem value={""}>No Filter</MenuItem>
          <MenuItem value={"Defeated"}>Defeated</MenuItem>
          <MenuItem value={"Enacted"}>Enacted</MenuItem>
          <MenuItem value={"Lapsed"}>Lapsed</MenuItem>
          <MenuItem value={"Current"}>Current</MenuItem>
          <MenuItem value={"Withdrawn"}>Withdrawn</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BillStatusSelect;
