import {useState}from "react";
///styling
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell,TableBody } from "@mui/material";
import TableBodyContainer from "./TableBodyContainer";
import TableBodyInputs from "./TableBodyInputs";


const TableHeaderContainer = ({ documents }) => {
  const [ isEdit , setIsEdit] = useState(false)



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Owner</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="right">Members</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents?.map((item) => (
            <TableRow
            key={item.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
            {!isEdit  ?
              <TableBodyContainer item={item} isEdit={isEdit} setIsEdit={setIsEdit} />
              :
              <TableBodyInputs isEdit={isEdit} setIsEdit={setIsEdit} item={item} />
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHeaderContainer;

