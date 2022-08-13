import { useState } from "react";
import { useTaskInput } from "../../hooks/useTaskInput";
import ListArr from "./ListArr";
//styling
import { Button, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskList = () => {
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const { handleChange, reset, taskInput } = useTaskInput();

    const toggleButton = () => setIsBtnVisible(!isBtnVisible);

    const addTask = () => {
        setTaskList([
            ...taskList,
            { id: taskList.length + 1, description: taskInput },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskInput === "") return;
        addTask();
        reset();
        setIsBtnVisible(false);
    };

    return (
        <Box>
            {isBtnVisible ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            textDecoration: "none",
                            overflow: "auto",
                        }}
                        value={taskInput}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    />
                </form>
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={toggleButton}
                >
                    new card
                </Button>
            )}
            <ListArr taskList={taskList} />
        </Box>
    );
};

export default TaskList;

