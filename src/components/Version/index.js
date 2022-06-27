import React from 'react';
import { Stack, Typography } from '@mui/material';

const Version = ({ version }) => {
	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			alignItems="center"
			style={{ position: 'fixed', bottom: 10, right: 10 }}
		>
			<Typography variant="caption" style={{ opacity: 0.66 }}>
				v{version}
			</Typography>
		</Stack>
	);
};

export default Version;
