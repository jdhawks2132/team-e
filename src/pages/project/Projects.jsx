import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';



// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Project from './Project';
import { Box } from '@mui/system';


const Projects = () => {
  const [projects, setProjects] = useState([])
  const { authIsReady,  user } = useAuthContext();
  const { documents } = useCollection('test-projects')

 
  
  useEffect(()=> {
     if(documents && user){
         let projectss = documents.filter((doc) => doc.owner == user.uid);

         let teamMember = []

         const projectsTwo = documents.forEach(pro => {
            let membersarr = pro.members
            console.log(membersarr)
            membersarr.forEach(member => {
                if(member.id === user.uid) teamMember.push(pro)
            })
         })

         let semifinalProjects = [...projectss, ...teamMember]
        const uniqueIds = []
        const finalProjects = semifinalProjects.filter(pro =>{
            const isDuplicate = uniqueIds.includes(pro.id)

            if(!isDuplicate){

                uniqueIds.push(pro.id);
                return true
            } 
            return false
        })
        

         
         console.log(finalProjects)
         setProjects(finalProjects)
     }
     
  }, [user, documents])

 

  return (
  
      <Box  sx={{display: 'flex'}}>
        <Grid container component={'div'}  sx={gridStyles}>
            { projects.map( (projectInfo, idx) => (
             <Project key={projectInfo.id} info={projectInfo}/>
            ))}
        </Grid>
      </Box> 
 

  )
}

const gridStyles = {
    border: '1px solid red', 
    height: '100vh',
    width: '100vw',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    alignContent: 'space-evenly'
    
};



export default Projects