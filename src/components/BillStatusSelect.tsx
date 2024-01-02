import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
