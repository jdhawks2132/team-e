// import ListArr from '../Task/ListArr'
import React from 'react';
import TaskHeader from '../Task/TaskHeader';
import { useCollection } from '../../hooks/useCollection';

const Dashboard = () => {
	const { documents, error } = useCollection('test-projects');

	console.log(documents);
	return (
		<>
			<TaskHeader />
			{/* <ListArr/>  */}
		</>
	);
};

export default Dashboard;
