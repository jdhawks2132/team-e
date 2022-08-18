import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
//styling
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { MenuItem, Select, TableCell, TextField } from '@mui/material';
import { useCollection } from '../../hooks/useCollection';

const TableBodyInputs = ({
	item: {
		id,
		name,
		owner,
		description,
		members,
		status,
		budget,
		enddate,
		startdate,
	},
	isEdit,
	setIsEdit,
}) => {
	const { updateDocument, response } = useFirestore('test-projects');
	const [updateMembers, setUpdateMembers] = useState([]);
	const { documents } = useCollection('users');

	useEffect(() => {
		if (documents) {
			setUpdateMembers(
				documents.map((user) => {
					return { value: { ...user, id: user.id }, label: user.displayName };
				})
			);
		}
	}, [documents]);

	//destructure the method you want

	const statusOptions = ['New', 'Completed', 'In Progress', 'On Hold'];

	const [inputs, setInputs] = useState({
		name: name,
		owner: owner,
		description: description,
		members: members,
		status: status,
		budget: budget,
		startdate: startdate,
		enddate: enddate,
	});


	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		updateDocument(id, inputs);
		setIsEdit(false);
	};

	const cancelEditToggle = () => setIsEdit(!isEdit);

	return (
		<>
			<TableCell
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
				}}
			>
				<DoneAllIcon onClick={submitHandler} />
			</TableCell>
			<TableCell
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
				}}
			>
				<ClearIcon onClick={cancelEditToggle} />
			</TableCell>
			<TableCell>
				<TextField
					style={{ fontSize: '10px' }}
					size='small'
					onChange={handleChange}
					value={inputs.name}
					name='name'
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					size='small'
					onChange={handleChange}
					value={inputs.owner}
					name='owner'
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					size='small'
					onChange={handleChange}
					value={inputs.description}
					name='description'
				></TextField>
			</TableCell>
			<TableCell>
				<Select
					multiple
					value={inputs.members}
					onChange={handleChange}
					name='members'
				>
					{updateMembers.map((user) => (
						<MenuItem key={user.value.id} value={user.value}>
							{user.label}
						</MenuItem>
					))}
				</Select>
			</TableCell>
			<TableCell>
				<Select name='status' value={inputs.status} onChange={handleChange}>
					{statusOptions.map((status) => (
						<MenuItem key={status} value={status}>
							{status}
						</MenuItem>
					))}
				</Select>
			</TableCell>

			<TableCell>
				<TextField
					size='small'
					onChange={handleChange}
					value={inputs.budget}
					name='budget'
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					size='small'
					onChange={handleChange}
					value={inputs?.startdate || ''}
					name='startdate'
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					size='small'
					onChange={handleChange}
					value={inputs?.enddate || ''}
					name='enddate'
				></TextField>
			</TableCell>
		</>
	);
};

export default TableBodyInputs;
