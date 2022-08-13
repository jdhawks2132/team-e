import { List, Card } from "@mui/material";

const ListArr = ({ taskList }) => {
  return (
    <>
      {taskList.map((list) => (
        <List key={list.id}>
          <Card
            variant="outlined"
            sx={{
              color: "black",
              minWidth: 200,
              minHeight: 50,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginX: 1,
              paddingLeft: 1,
            }}
          >
            {list.description}
          </Card>
        </List>
      ))}
    </>
  );
};

export default ListArr;
