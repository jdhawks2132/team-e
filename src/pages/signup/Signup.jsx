import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
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
		<form onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<label>
				<span>email</span>
				<input
					required
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				<span>password</span>
				<input
					required
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<label>
				<span>display name</span>
				<input
					required
					type='text'
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				/>
			</label>
			<label>
				<span>choose a thumbnail:</span>
				<input required type='file' onChange={handleFileChange} />
				{thumbError && <p>{thumbError}</p>}
			</label>
			{!isPending && <button>Sign Up</button>}
			{isPending && <p>Loading...</p>}
			{error && <p>{error}</p>}
		</form>
	);
};

export default Signup;
