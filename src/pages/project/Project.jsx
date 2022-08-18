import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { projectFirestore } from '../../firebase/config';
import { height } from '@mui/system'
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Project = ({info}) => {
  const [userName, setUserName] = useState('')

useEffect(()=> {
     const resolveResult = async()=> {
       console.log(info.owner)
         let usersCollection = projectFirestore.collection('users');
         let user = await usersCollection.doc(info.owner).get()
         let userName = user.data()
         userName = userName.displayName
         console.log(userName)
         setUserName(userName)
     }
     resolveResult()
     
  }, [])

let nav = useNavigate()

function goToProject(){
  nav(`/projects/${info.id}`)
}

  return (
    <Grid item xs={5} sm={6} md={4} sx={gridItemStyles} onClick={goToProject}>
      {/* <Link to={`projects/${number}`}> */}
      
      <Card sx={cardItemStyles}>
      <Typography component={'h3'} variant={'h5'}>{info.name.toUpperCase()}</Typography>
      <Typography component={'div'} variant={'h6'}>Created By: {userName}</Typography>
      {/* {info.members.length > 0 ? } */}
      <Typography component={'div'} variant={'h6'}>{info.enddate === null ? '' : `Due Date: ${info.enddate}`}</Typography>
      <Typography component={'div'} variant={'h6'}>Status: {info.status}</Typography>
      
      </Card>
      {/* </Link> */}

    </Grid>
  )
}

const gridItemStyles = {
  height: '200px',
  marginBottom: '5px'
}

const cardItemStyles = {
  width: 'inherit',
  height: 'inherit'
}





export default Project