import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export function useToast() {
	return useContext(ToastContext);
}

export function ToastProvider({ children }) {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState();
	const [type, setType] = useState('success');

	const postMessage = (msg, type = 'success') => {
		setMessage(msg);
		setType(type);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ToastContext.Provider value={{ postMessage }}>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			{children}
		</ToastContext.Provider>
	);
}
