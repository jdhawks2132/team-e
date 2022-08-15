import React from "react";
import { TableCell, TextField } from "@mui/material";

const Inputs = ({ arr: { id, align, value, name }, inputs, setInputs }) => {
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TableCell key={id}>
        <TextField
          size="small"
          onChange={handleChange}
          align={align}
          value={inputs[value]}
          name={name}
        >
          {inputs.title}
        </TextField>
      </TableCell>
    </>
  );
};

export default Inputs;
