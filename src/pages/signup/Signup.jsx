import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

//Styling
import  Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Typography, TextField, Button, Alert } from '@mui/material';
Git

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
		<>
		<Box component={"form"} id='singup'>
			<Typography component={'h2'} variant={'h3'} color='black'>Sign Up</Typography>
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
			{!isPending && <Button size='large' onClick={handleSubmit}>Sign Up</Button>}
			{isPending && <CircularProgress/>}
			{error && <Alert  severity='error'>{error}</Alert> }
		
		</Box>
		</>
	);
};

export default Signup;
