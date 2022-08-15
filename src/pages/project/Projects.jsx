// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Project from './Project';


const Projects = () => {



  return (
        <Grid container component={'div'} sx={{border: '1px solid red'}}>
            <Project />
            <Project />
            <Grid item>dfdfd</Grid>
        </Grid>

  )
}

// function goToProject(){
//     console.log(this)
// }

export default Projects