import { useCollection } from "../../hooks/useCollection";
import TableHeaderContainer from "../table/TableHeaderContainer";

const Dashboard = () => {
	const { documents, error } = useCollection("test-projects");

	return (
		<>
			<TableHeaderContainer documents={documents} />
		</>
	);
};

export default Dashboard;
