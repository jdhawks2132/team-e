import { useState } from "react";
// import Inputs from "./Inputs";
//styling
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { TableCell, TextField } from "@mui/material";

const TableBodyInputs = ({ item, isEdit, setIsEdit }) => {
    const [inputs, setInputs] = useState({
        nameTitle: item.name,
        ownerTitle: item.owner,
        title: item.description,
    });
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


    const submitHandler = (id) => {
        const newEditItems = item.find((el) => el.id === id)
        setIsEdit(!isEdit)
       setInputs(newEditItems)
        console.log(newEditItems)
    }

    // const mapMembers = item.members.map(member => member.displayName)

    const cancelEditToggle = () => setIsEdit(!isEdit);
    // const inputArray = [
    //     { id: 0, name: "nameTitle", value:inputs.nameTitle, type: "text", align: "right" },
    //     { id: 1, name: "ownerTitle",value: inputs.ownerTitle, type: "text", align: "right" },
    //     { id: 2, name: "title", value:inputs.title, type: "text", align: "right" },
    //     // { id: 3, name: "members", value:mapMembers, type: "text", align: "right" },
    // ];

    return (
        <>
            <TableCell
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                {/* {inputArray.map((arr) => (
                <Inputs key={arr.id} arr={arr} inputs={inputs} setInputs={setInputs} />
            ))} */}
                <DoneAllIcon onClick={submitHandler}/>
                <ClearIcon onClick={cancelEditToggle} />
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.nameTitle}
                    name="nameTitle"
                >
                </TextField>
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.ownerTitle}
                    name="ownerTitle"
                >
                </TextField>
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.title}
                    name="title"
                >
                </TextField>
            </TableCell>

        </>
    );
};

export default TableBodyInputs;
