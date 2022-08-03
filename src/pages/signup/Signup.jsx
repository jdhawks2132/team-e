import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

//Styling
import  Container  from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress'
import { Typography, TextField, Button, Alert, Box } from '@mui/material';


const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbError, setThumbError] = useState(null);

	const { signup, isPending, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		signup(email, password, displayName, thumbnail);
	};

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
			 	width: '75vw',
				borderRadius: '10px',
				display:"flex",
				flexDirection:"column",
				'& .MuiTextField-root': {width: '50%'}}}>
			<Typography component={'h2'} variant={'h3'} color='black' py={10}>Sign Up</Typography>
			<TextField required label='Email' id='singup-email' 
					value={email} onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField required label='Password' id='singup-password' type="password"
					value={password} onChange={(e) => setPassword(e.target.value)}
			/>
			<TextField required label='Display Name' id='singup-name' 
					value={displayName} onChange={(e) => setDisplayName(e.target.value)}
			/>
			<TextField required helperText='Choose a Thumbnail' id='singup-thumbnail' type='file' 
					  error={thumbError} onChange={handleFileChange}
			/>
			{!isPending && <Button size='large' variant='contained' onClick={handleSubmit}>Sign Up</Button>}
			{isPending && <CircularProgress/>}
			{error && <Alert  severity='error'>{error}</Alert> }
		
		</Paper>
		</Container >
	);
};

export default Signup;
