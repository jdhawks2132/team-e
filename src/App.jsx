import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/project/Projects';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import NewProject from './pages/create/NewProject';
import Navbar from './pages/nav/Navbar';
import ProjectDetails from './pages/project/ProjectDetails';

function App() {
	const { authIsReady, user } = useAuthContext();

	return (
		<div className='App'>
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route
							path='/'
							element={user ? <Dashboard /> : <Navigate to='/login' />}
						/>
						<Route
							path='/newproject'
							element={user ? <NewProject /> : <Navigate to='/login' />}
						/>
						<Route
							path='/login'
							element={!user ? <Login /> : <Navigate to='/' />}
						/>
						<Route
							path='/signup'
							element={!user ? <Signup /> : <Navigate to='/' />}
						/>
						<Route
							path='/projects'
							element={user ? <Projects /> : <Navigate to='/' />}
						/>
						<Route
							path='/projects/:id'
							element={user ? <ProjectDetails /> : <Navigate to='/login' />}
						/>
						<Route path='*' element={<Navigate to={'/'} />} />
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;

