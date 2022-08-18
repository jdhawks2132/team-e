import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
//styling
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import {  MenuItem, Select, TableCell, TextField } from "@mui/material";


//change the input object to match the firestore data
const TableBodyInputs = ({ item: {id, name, owner, description, members, status, budget, enddate, startdate, },isEdit, setIsEdit,}) => {
    const { updateDocument, response } = useFirestore("test-projects");

    //destructure the method you want
    // const optionStatus = [ status, "In Progress", "Done"]
    // const [options, setOptions] = useState(optionStatus);


    const [inputs, setInputs] = useState({
        name: name,
        owner: owner,
        description: description,
        members: members,
        budget: budget,
        startdate: startdate,
        enddate: enddate,
    });

    // const handleOptions = (e) => {
    //     setOptions(e.target.value);
    // };

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateDocument(id, inputs, options);
        setIsEdit(false);
    };

    const cancelEditToggle = () => setIsEdit(!isEdit);

    return (
        <>
            <TableCell
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <DoneAllIcon onClick={submitHandler} />
            </TableCell>
            <TableCell
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <ClearIcon onClick={cancelEditToggle} />
            </TableCell>
            <TableCell>
                <TextField
                    style={{ fontSize: "10px" }}
                    size="small"
                    onChange={handleChange}
                    value={inputs.name}
                    name="name"
                ></TextField>
            </TableCell>
            <TableCell>
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.owner}
                    name="owner"
                ></TextField>
            </TableCell>
            <TableCell>
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.description}
                    name="description"
                ></TextField>
            </TableCell>
          
{/*             
                <TextField select value={options} onChange={handleOptions}>
                    {optionStatus.map((item, i) => (
                        <MenuItem key={i} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </TextField> */}
          
            <TableCell>
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.budget}
                    name="budget"
                ></TextField>
            </TableCell>
            <TableCell>
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs?.startdate || ""}
                    name="startdate"
                ></TextField>
            </TableCell>
            <TableCell>
            <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs?.enddate || ""}
                    name="enddate"
                ></TextField>
            </TableCell>
            
            
        </>
    );
};

export default TableBodyInputs;
