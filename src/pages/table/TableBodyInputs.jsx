import { useState } from "react";
// import Inputs from "./Inputs";
//styling
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { TableCell, TextField } from "@mui/material";
//import useFireStore
import { useFirestore } from "../../hooks/useFirestore";

//change the input object to match the firestore data
const TableBodyInputs = ({ item, isEdit, setIsEdit }) => {
    //destructure the method you want
    const { updateDocument, response } = useFirestore('test-projects');

    const [inputs, setInputs] = useState({
        name: item.name,
        owner: item.owner,
        description: item.description,
    });
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    console.log(inputs)

    const submitHandler = (e) =>{  
        e.preventDefault();
        updateDocument(item.id, inputs);
        setIsEdit(false);
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
                    value={inputs.name}
                    name="name"
                >
                </TextField>
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.owner}
                    name="owner"
                >
                </TextField>
            </TableCell>
            <TableCell >
                <TextField
                    size="small"
                    onChange={handleChange}
                    value={inputs.description}
                    name="description"
                >
                </TextField>
            </TableCell>

        </>
    );
};

export default TableBodyInputs;
