import {useState}from "react";
///styling
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell,TableBody } from "@mui/material";
import TableBodyContainer from "./TableBodyContainer";
import TableBodyInputs from "./TableBodyInputs";


const TableHeaderContainer = ({ documents }) => {
  const [ isEdit , setIsEdit] = useState('')


  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead  >
          <TableRow sx={{backgroundColor:"#3D3D3D"}} >
            <TableCell  align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell sx={{color:"white"}} align="left">Name</TableCell>
            <TableCell sx={{color:"white"}}  align="left">Owner ID</TableCell>
            <TableCell sx={{color:"white"}}  align="left">Description</TableCell>
            <TableCell sx={{color:"white"}} align="left">Members</TableCell>
            <TableCell sx={{color:"white"}} align="left">Status</TableCell>
            <TableCell sx={{color:"white"}} align="center">Budget</TableCell>
            <TableCell sx={{color:"white"}}  align="center">Start Date</TableCell>
            <TableCell sx={{color:"white"}}  align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents?.map((item) => (
            <TableRow
            key={item.id}
            sx={{ border:1}}
            >
            {isEdit === item.id  ?
              <TableBodyInputs isEdit={isEdit} setIsEdit={setIsEdit} item={item} />
              :
              <TableBodyContainer item={item} isEdit={isEdit} setIsEdit={setIsEdit} />
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHeaderContainer;

