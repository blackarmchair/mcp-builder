import React from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const OverlayedStack = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	minWidth: '33vw',
	minHeight: '50vh',
	textAlign: 'center',
}));

const ENTRIES = [
	{
		label: 'Core Rules',
		link: 'https://www.atomicmassgames.com/s/CP01_CrisisProtocol_Rule_Book_112221.pdf',
	},
	{
		label: 'FAQ & Errata',
		link: 'https://www.atomicmassgames.com/s/OP_CrisisProtocol_FAQ_020322-x5jy.pdf',
	},
	{
		label: 'Crisis Event Rules',
		link: 'https://www.atomicmassgames.com/s/OP_CrisisProtocol_CrisisEvent_web.pdf',
	},
	{
		label: 'Base Size Reference',
		link: 'https://www.atomicmassgames.com/s/OP_CrisisProtocol_BaseSizes_020322.pdf',
	},
	{
		label: 'Affiliation Reference',
		link: 'https://www.atomicmassgames.com/s/OP_CrisisProtocol_Affiliation_List_020322.pdf',
	},
	{
		label: 'Banned & Restricted List',
		link: 'https://www.atomicmassgames.com/s/OP_CrisisProtocol_BNR_020322.pdf',
	},
];

const Rules = () => {
	const navigateAway = (url) => window.open(url, '_blank');

	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '100vh' }}
		>
			<OverlayedStack
				spacing={2}
				justifyContent="center"
				sx={{ minWidth: { xs: '66vw', md: '25vw' } }}
			>
				{ENTRIES.map((entry) => (
					<Typography
						variant="h6"
						onClick={() => navigateAway(entry.link)}
						sx={{ cursor: 'pointer' }}
						key={entry.label}
					>
						{entry.label}
					</Typography>
				))}
			</OverlayedStack>
		</Stack>
	);
};

export default Rules;
