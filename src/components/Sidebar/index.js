import React from 'react';
import { useRouter } from '../../contexts/RouterContext';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Sidebar = () => {
	const { route, navigate, goBack } = useRouter();

	return (
		<Box sx={{ flexGrow: 1, mb: 1 }}>
			<AppBar position="static" color="overlay">
				<Toolbar>
					{route.to.localeCompare('/') && (
						<IconButton onClick={goBack} sx={{ mr: 2 }}>
							<ArrowBackIosIcon color="white" />
						</IconButton>
					)}
					<Typography
						variant="h4"
						component="div"
						sx={{
							flexGrow: 1,
							fontFamily: "'Staatliches', cursive",
							cursor: 'pointer',
						}}
						onClick={() => navigate('/')}
					>
						Friday AI
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Sidebar;
