import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import reactLogo from './assets/react.svg';
import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Projects from './pages/project/Projects'
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import NewProject from './pages/create/NewProject';
import Logout from './pages/logout/Logout';

function App() {
	const { authIsReady, user } = useAuthContext();

	return (
		<div className='App'>
			{authIsReady && (
				<BrowserRouter>
					<Routes>
						<Route
							path='/out'
							element={user ? <Logout /> : <Navigate to='/login' />}
						/>
						<Route
							path='/'
							element={user ? <Dashboard /> : <Navigate to='/login' />}
						/>
						<Route
							path='/create'
							element={user ? <Create /> : <Navigate to='/login' />}
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
							element={user ? <Projects /> : <Navigate to='/login' />}
						/>
						<Route path='*' element={<Navigate to={'/'} />} />
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
