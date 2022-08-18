import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
//styling
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { MenuItem, Select, TableCell, TextField } from "@mui/material";


//change the input object to match the firestore data
const TableBodyInputs = ({ item: {id, name, owner, description, members, status, budget, enddate, startdate, },isEdit, setIsEdit,}) => {
  console.log(id, members);
  //destructure the method you want
    const { updateDocument, response } = useFirestore("test-projects");

    const [inputs, setInputs] = useState({
        name: name,
        owner: owner,
        description: description,
        members: members,
        status: status,
        budget: budget,
        startdate: startdate,
        enddate: enddate,
    });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateDocument(id, inputs);
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
            <TableCell>
                {/* <Select
              size="small"
              select
            
              value={inputs.members}
              onChange={handleChange}
              name="members"
              >
                {members?.map(member => (
                    <MenuItem key={member.id} value={member.displayName}>{member.displayName}</MenuItem>
                    ))}
                    

              </Select> */}
            </TableCell>
            <TableCell></TableCell>
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
                    value={inputs?.startdate}
                    name="startdate"
                ></TextField>
            </TableCell>
            <TableCell>
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.enddate}
                    name="enddate"
                ></TextField>
            </TableCell>
        </>
    );
};

export default TableBodyInputs;
