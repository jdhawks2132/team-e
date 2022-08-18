// import ListArr from '../Task/ListArr'm
// import TaskHeader from '../Task/TaskHeader';
import { useCollection } from "../../hooks/useCollection";

import TableHeaderContainer from "../table/TableHeaderContainer";

const Dashboard = () => {
	const { documents, error } = useCollection("test-projects");

	return (
		<>

			<TableHeaderContainer documents={documents} />
			{/* <TaskHeader /> */}
			{/* <ListArr/>  */}
		</>
	);
};

export default Dashboard;
