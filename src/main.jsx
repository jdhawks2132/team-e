import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterMoment}>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
		</LocalizationProvider>
	</React.StrictMode>
);
