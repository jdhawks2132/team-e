import { useState } from 'react'
import SelectStatus from "./SelectStatus";
import { AvatarGroup, Avatar } from '@mui/material';
import { TableCell } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const TableBodyContainer = ({ item: {id, name, owner, description, budget, startdate, enddate, status, members }, isEdit, setIsEdit }) => {
  const editToggle = () => setIsEdit(id)
  return (
    <>
      <TableCell sx={{cursor:"pointer"}}  component="th" scope="row"> <EditIcon onClick={editToggle}/> </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">{owner}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">
        <AvatarGroup total={1}>
          {members.map(({ id, name, photoUrl }) => (
            <Avatar key={id} alt={name} src={photoUrl} />
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell align="right">
        <SelectStatus status={status} />
      </TableCell>
      <TableCell align="right">{budget}</TableCell>
        <TableCell align="right">{startdate}</TableCell>
        <TableCell align="right">{enddate}</TableCell>
    </>
  );
}

export default TableBodyContainer