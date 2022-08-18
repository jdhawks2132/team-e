import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';


// import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { People } from '@mui/icons-material';

const ProjectDetails = () => {
  const [project, setProject] = useState([])
  const auth = useAuthContext();
  const location = useLocation()

  let itemId = location.pathname.replace('/projects/', '')
  
  useEffect(()=> {
     const resolveResult = async()=> {
         let theresult = await fetchProjects();
        //  setProjects(theresult)
        setProject(theresult)
     }
     resolveResult()
     
  }, [])

   async function fetchProjects(){
      let itemsCollection = projectFirestore.collection('test-projects');
      console.log(itemId)
      let item = await itemsCollection.doc(itemId).get();
      console.log(item)
      item = item.data()
      console.log(item)
      return item
      
  }

  return (
      <Box component={Paper} sx={boxStyles} >
        <Typography component={'h1'} variant={'h4'}>{project['name']}</Typography>
        <Typography component={'div'} variant={'h6'}>Created By: {project['owner']}</Typography>
        <Typography component={'div'} variant={'h6'}>Start Date: { String(project['startdate']) ?  project.startdate : 'N/A'}</Typography>
    
      <Typography component={'div'} variant={'h6'}>{project['enddate'] === null ? 'Due Date: n/a' : `Due Date: ${project['enddate']}`}</Typography>
      <Typography component={'div'} variant={'h6'}>Budget: {project.budget}</Typography> 
      <Typography component={'div'} variant={'h6'}>Description: {project.description}</Typography> 
   
      { project['members']?.length > 0 ? 
       
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {project['members'].map(row =>( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={row.photoURL} />
              </TableCell>
              <TableCell align="right">{row.displayName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
          
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
      
    
        : 
        
        <div>no</div>}
    

      </Box> 
  )
}


const boxStyles = {
    border: '1px solid red', 
    height: '100',
    width: '100%vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start'
    
};

export default ProjectDetails