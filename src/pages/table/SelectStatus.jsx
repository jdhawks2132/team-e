import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectStatus = ( { status } ) => {
    const [statusOptions, setStatusOptions] = useState(status);
    const optionValues = [
        { id: 0, value: status },
        { id: 1, value: "In Progress" },
        { id: 2, value: "Done" },
    ];

    const handleChange = (e) => {
        setStatusOptions(e.target.value);
    };

    return (
        <FormControl  size="small" sx={{width:"5rem" }} >
            <Select sx={{paddingRight: 0.3, height:30, fontSize:12}} fullWidth value={statusOptions} onChange={handleChange} autoWidth>
                {optionValues.map(({ id, value }) => (
                    <MenuItem sx={{fontSize:12,width:"5.3rem"}} key={id} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectStatus;
