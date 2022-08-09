import { Box } from "@mui/system";
import { List } from "@mui/material";
import TaskList from "./TaskList";

const TaskHeader = () => {
  const taskTitle = [
    { id: 0, text: "Task" },
    { id: 1, text: "In Progress" },
    { id: 2, text: "Review" },
    { id: 3, text: "Done" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        height: "100vh",
        width: "100vw",
        gap: 4,
        overflow: "hidden",
      }}
    >
      {taskTitle.map((title) => (
        <List
          sx={{
            border:1,
            width: 300,
            height: "auto",
            color: "black",
          }}
          key={title.id}
        >
          {title.text}
          <TaskList />
        </List>
      ))}
    </Box>
  );
};

export default TaskHeader;
