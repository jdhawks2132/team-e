import { Pending } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {
	projectAuth,
	projectStorage,
	projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);
		console.log('at step one', isPending, isCancelled);
		try {
			// signup
			console.log('signing up', isPending, isCancelled);
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			console.log('at step two');

			if (!res) {
				throw new Error('Could not complete signup');
			}
			console.log('at step 3');
			// upload the image to storage after user is created so we have access to the id
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
			const imgUrl = await img.ref.getDownloadURL();

			// add display name and image to user
			await res.user.updateProfile({ displayName, photoURL: imgUrl });

			// create user document in case we want access globally from the database (firestore)
			await projectFirestore.collection('users').doc(res.user.uid).set({
				online: true,
				displayName,
				email,
				photoURL: imgUrl,
			});

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled) {
				console.log('successful singup');
				setIsPending(false);
				setError(null);
				console.log(Pending, error);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log('error in signup');
				setError(err.message);
				setIsPending(false);
			}
			if (isCancelled) {
				console.log('user navigated away');
				setError(err.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true), console.log('cleaning');
	}, []);

	return { signup, error, isPending };
};
