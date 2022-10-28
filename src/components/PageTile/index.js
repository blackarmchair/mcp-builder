import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Tile = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	textAlign: 'center',
}));

const PageTile = ({ handleClick, icon, label }) => {
	return (
		<Grid
			item
			sm={6}
			xs={12}
			onClick={handleClick}
			style={{ cursor: 'pointer' }}
		>
			<Tile direction="column" p={1} alignItems="center" spacing={1}>
				{icon}
				<Typography>{label}</Typography>
			</Tile>
		</Grid>
	);
};

export default PageTile;
