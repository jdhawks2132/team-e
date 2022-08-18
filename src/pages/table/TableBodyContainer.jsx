import { AvatarGroup, Avatar } from '@mui/material';
import { TableCell } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFirestore } from '../../hooks/useFirestore';
// import Avatars from './Avatars';

const TableBodyContainer = ({ item: {id, name, owner, description, budget, startdate, enddate, status, members }, isEdit, setIsEdit }) => {
  const {deleteDocument} = useFirestore("test-projects")
  
  const editRow = () => setIsEdit(id)
  const deleteRow = () => deleteDocument(id)
  return (
    <>
      <TableCell sx={{cursor:"pointer"}}  component="th" scope="row"> <EditIcon onClick={editRow}/> </TableCell>
      <TableCell sx={{cursor:"pointer"}}  > <DeleteIcon onClick={deleteRow}/></TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{owner}</TableCell>
      <TableCell align="left">{description}</TableCell>
      <TableCell align="left">{members.map(member => member.displayName + " ") }</TableCell>
      <TableCell align="right">{typeof status === 'string' ? status : status.value}</TableCell>
      <TableCell align="right">{budget}</TableCell>
      <TableCell align="right">{startdate}</TableCell>
       <TableCell align="right">{enddate}</TableCell>
    </>
  );
}

export default TableBodyContainer