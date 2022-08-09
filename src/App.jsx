import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='App'>
			
			<BrowserRouter>
				<Routes>
					<Route path='/out' element={<Logout />}/>
					<Route path='/' element={<Dashboard />} />
					<Route path='/create' element={<Create />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/projects/:id' element={<Project />} />
					<Route path='*' element={<Navigate to={'/'} />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
