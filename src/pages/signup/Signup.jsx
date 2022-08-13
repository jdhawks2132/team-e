import { useState, useEffect } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


//Styling
import  Container  from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress'
import { Typography, TextField, Button, Alert } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import PersonIcon from '@mui/icons-material/Person';


const Signup = () => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbError, setThumbError] = useState(null);
	const [showPassword, setShowPassword] = useState(false)

	const { signup, isPending, error } = useSignup();
	const { user } = useAuthContext()
	const nav = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!thumbnail) return setThumbError('Please select a thumbnail')
		await signup(email, password, displayName, thumbnail);
		// console.log(error, isPending, user)
		// if(user) nav('/create')
	};


	//
	const toggleShowPass = (e) => {
		setShowPassword(!showPassword)
	}

	//check to see if there is an user created and prevents logged in users from visiting signup unless they log out 
	useEffect(()=>{
		console.log(user)
		if(user) nav('/create')
	}, [user])


	const handleFileChange = (e) => {
		setThumbnail(null);
		let selectedFile = e.target.files[0];

		if (!selectedFile) {
			setThumbError('Please select a file');
			return;
		}
		if (!selectedFile.type.includes('image')) {
			setThumbError('Please select an image file');
			return;
		}
		if (selectedFile.size > 1000000) {
			setThumbError('Please select a file less than 1MB');
			return;
		}
		setThumbError(null);
		setThumbnail(selectedFile);
		console.log('thumbnail updated');
	};

	return (
		<Container sx={{display:'flex'}}>
		<Paper component={"form"} id='singup' elevation={10}
			 sx={{backgroundColor: 'white', 
			 	height: '75vh', 
			 	width: {lg: '45vw', md: '65vw', sm: '50vw'},
				borderRadius: '10px',
				display:"flex",
				flexDirection: "column",
				alignItems: 'center',

				'& .MuiTextField-root': {width: {xs: '70%', sm: '60%', md: '40%'}, mb: 2}}}>
			<Typography component={'h2'} variant={'h3'} color='black' pt={10} pb={4}>Sign Up</Typography>

			<TextField required label='Email' id='singup-email' 
					value={email} onChange={(e) => setEmail(e.target.value)}
					InputProps={{
            		startAdornment: <InputAdornment position="start"><EmailTwoTone /></InputAdornment>,
          			}}
          			// variant="filled"
			/>
			<TextField required label='Password' id='singup-password' type={showPassword ? 'text' : 'password'}
					value={password} onChange={(e) => setPassword(e.target.value)}
					InputProps={{
            		startAdornment: <InputAdornment position="start" onClick={toggleShowPass}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputAdornment>,
          			}}
			/>
			<TextField required label='Display Name' id='singup-name' 
					value={displayName} onChange={(e) => setDisplayName(e.target.value)}
					InputProps={{
            		startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
          			}}
			/>
			<TextField required helperText='Choose a Thumbnail' id='singup-thumbnail' type='file' 
					  error={Boolean(thumbError)} onChange={handleFileChange}
			/>
			{/* {!isPending && <Button size='large' variant='contained' onClick={handleSubmit}>Sign Up</Button>} */}
			
			{(isPending && !error) ? <CircularProgress/> : <Button size='large' variant='contained' onClick={handleSubmit}>Sign Up</Button>}
			{error && <Alert  severity='error'>{error}</Alert> }
			{thumbError && <Alert  severity='error'>{thumbError}</Alert> }
		
		</Paper>
		</Container >
	);
};

export default Signup;
