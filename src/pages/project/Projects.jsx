import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Project from './Project';
import { Box } from '@mui/system';

const Projects = () => {



  return (
      <Box  sx={{display: 'flex'}}>
        <Grid container component={'div'} 
        sx={{border: '1px solid red', 
        height: '100vh',
        width: '100vw'}}>
            <Project />
            <Project />
            <Grid item>dfdfd</Grid>
        </Grid>
      </Box>
  )
}

// function goToProject(){
//     console.log(this)
// }

export default Projects