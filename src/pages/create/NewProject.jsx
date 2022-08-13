import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
	Avatar,
	Typography,
	TextField,
	Box,
	Button,
	Chip,
	Select,
	MenuItem,
	Stack,
	Divider,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	FormHelperText,
} from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';

const NewProject = () => {
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [descLength, setDescLength] = useState(0);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [dateError, setDateError] = useState('');
	const [budget, setBudget] = useState(0);
	const [isDisabled, setIsDisabled] = useState(true);
	const [users, setUsers] = useState([]);
	const [names, setNames] = useState([]);
	const { user, authIsReady } = useAuthContext();
	const { addDocument, response } = useFirestore('test-projects');
	const { documents, error } = useCollection('users');
	const memberRef = useRef();
	const nav = useNavigate();

	useEffect(() => {
		if (documents && authIsReady === true) {
			setUsers(
				documents.map((user) => {
					return { value: { ...user, id: user.id }, label: user.displayName };
				})
			);

			const owner = () => {
				for (let i = 0; i < documents.length; i++) {
					if (documents[i].id === user.uid) {
						return i;
					}
				}
			};
			memberRef.current = [documents[owner()]];
			setNames([user.displayName]);
		}
	}, [documents, authIsReady]);

	useEffect(() => {
		console.log('LISTENING', response);
	}, [response]);

	// disable submit button if there is a date error or no project name present
	// currently not validating emails
	useEffect(() => {
		projectName === '' || dateError
			? setIsDisabled(true)
			: setIsDisabled(false);
	}, [projectName, dateError]);

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const handleChange = (event) => {
		let value = event.target.value;
		setNames(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	function populateUserObjects() {
		let people = [];
		names.forEach((name) => {
			for (let i = 0; i < users.length; i++) {
				if (name === users[i].label) {
					people.push(users[i].value);
				}
			}
		});
		memberRef.current = people;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		populateUserObjects();
		setIsDisabled(true);

		let newProject = {
			name: projectName,
			description: description,
			status: 'New',
			startdate: startDate && startDate.toString(), // Dates from the date picker are stored as Moment Objects.
			enddate: endDate && endDate.toString(), // Firebase cannot store Moment Objects, so they will convert to ISO strings
			budget: budget,
			members: memberRef.current,
			owner: user.uid,
		};

		console.log(newProject);
		try {
			addDocument(newProject);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		nav('/');
	}

	return (
		<>
			<Container
				maxWidth='md'
				sx={{
					bgcolor: 'white',
					borderRadius: 5,
					width: 700,
					height: 700,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					boxShadow: 3,
				}}
			>
				<Typography variant='h2' sx={{ color: 'black' }}>
					New Project
				</Typography>
				<Box component='form' id='new-project'>
					<Stack spacing={2} mt={2}>
						<TextField
							id='project-name'
							type='text'
							label='Project Name'
							name='projectName'
							required
							helperText='Required'
							onChange={(e) => {
								setProjectName(e.target.value);
							}}
						/>
						<TextField
							id='description'
							type='text'
							label='Description'
							name='description'
							multiline
							rows={6}
							inputProps={{ maxLength: 2000 }}
							helperText={descLength + '/2000'}
							onChange={(e) => {
								setDescription(e.target.value);
								setDescLength(e.target.value.length);
							}}
						/>
					</Stack>
					<Stack
						direction='row'
						spacing={2}
						my={2}
						divider={<Divider orientation='vertical' flexItem />}
					>
						<DatePicker
							id='start-date'
							label='Start Date'
							value={startDate}
							onChange={(newValue) => {
								if (endDate && newValue.isAfter(endDate)) {
									setStartDate(newValue);
									setDateError('End Date must be on or after Start Date');
									return;
								}
								setDateError('');
								setStartDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
						<FormControl error={dateError ? true : false}>
							<DatePicker
								id='end-date'
								label='End Date'
								value={endDate}
								onChange={(newValue) => {
									if (startDate && newValue.isBefore(startDate)) {
										setEndDate(newValue);
										setDateError('End Date must be on or after Start Date');
										return;
									}
									setDateError('');
									setEndDate(newValue);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
							{endDate && (
								<FormHelperText id='end-date-error'>{dateError}</FormHelperText>
							)}
						</FormControl>
						<FormControl>
							<InputLabel htmlFor='budget'>Project Budget</InputLabel>
							<OutlinedInput
								id='budget'
								type='number'
								label='Project Budget'
								name='budget'
								startAdornment={
									<InputAdornment position='start'>$</InputAdornment>
								}
								onChange={(e) => {
									setBudget(e.target.value);
								}}
							/>
						</FormControl>
					</Stack>
					<FormControl fullWidth variant='outlined'>
						<InputLabel id='member-label'>Team</InputLabel>
						<Select
							id='member-select'
							labelId='member-label'
							label='Team'
							multiple
							value={names}
							onChange={handleChange}
							input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{users.map((userDoc) => (
								<MenuItem key={userDoc.label} value={userDoc.label}>
									<Avatar
										alt={userDoc.label}
										src={userDoc.value.photoURL}
										sx={{ width: 28, height: 28, margin: 1 }}
									/>
									<p>
										<strong>{userDoc.label}</strong>{' '}
										<i>{' ' + userDoc.value.email}</i>
									</p>
								</MenuItem>
							))}
						</Select>
						<FormHelperText>
							Select team members for your project
						</FormHelperText>
					</FormControl>
					<Button
						sx={{ height: 50 }}
						id='submit-btn'
						variant='contained'
						disabled={isDisabled}
						color='success'
						onClick={handleSubmit}
						startIcon={<SaveIcon />}
					>
						Save Project
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default NewProject;
