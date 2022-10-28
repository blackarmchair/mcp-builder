import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const MediaContext = createContext();

export function useMediaContext() {
	return useContext(MediaContext);
}

export function MediaProvider({ children }) {
	const theme = useTheme();
	const screen = {
		isMobile: useMediaQuery(theme.breakpoints.down('md')),
		isDesktop: useMediaQuery(theme.breakpoints.up('md')),
	};

	return (
		<MediaContext.Provider value={{ screen }}>{children}</MediaContext.Provider>
	);
}
