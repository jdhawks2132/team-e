import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';


// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Project from './Project';
import { Box } from '@mui/system';
import { CookieTwoTone } from '@mui/icons-material';

const Projects = () => {
  const [projects, setProjects] = useState([])
  const auth = useAuthContext();
  
  useEffect(()=> {
     const resolveResult = async()=> {
         let theresult = await fetchProjects();
        //  setProjects(theresult)
        setProjects(theresult)
     }
     resolveResult()
     
  }, [])

   async function fetchProjects(){
      let results = []
      let itemsCollection = projectFirestore.collection('test-projects');
    //   items.get
      let items = await itemsCollection.where('owner', '==', auth.user.uid).get();
    //   let getItems =  await items.get()
    //   items.where('owner', '==', auth.user.uid)
    //   let q = projectFirestore.
    //   let theItems = await getDocs(items)
    console.log(items)
       items.forEach((doc) => results.push({id: doc.id, ...doc.data()}))
       console.log(results)
       return results
  }

  console.log(projects)
  return (
      <Box  sx={{display: 'flex'}}>
        <Grid container component={'div'}  sx={gridStyles}>
            { projects.map( projectInfo => (
            
                    <Project key={projectInfo.id} info={projectInfo}/>
            
            ))}
            {/* <Project />
            <Project />
            <Grid item>dfdfd</Grid> */}
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
    alignContent: 'flex-start'
    
};

// function goToProject(){
//     console.log(this)
// }

export default Projects