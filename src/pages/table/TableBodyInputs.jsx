import { useState } from "react";
import Inputs from "./Inputs";
//styling
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { TableCell } from "@mui/material";

const TableBodyInputs = ({ item, isEdit, setIsEdit }) => {
    const [inputs, setInputs] = useState({
        nameTitle: "",
        ownerTitle: "",
        title: "",
    });

    const cancelEditToggle = () => setIsEdit(!isEdit);
    const inputArray = [
        { id: 0, name: "nameTitle", type: "text", align: "right" },
        { id: 1, name: "ownerTitle", type: "text", align: "right" },
        { id: 2, name: "title", type: "text", align: "right" },
    ];

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
                <DoneAllIcon />
                <ClearIcon onClick={cancelEditToggle} />
            </TableCell>

            {inputArray.map((arr) => (
                <Inputs key={arr.id} arr={arr} inputs={inputs} setInputs={setInputs} />
            ))}
        </>
    );
};

export default TableBodyInputs;
