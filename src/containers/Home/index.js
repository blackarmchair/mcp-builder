import React from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from '../../contexts/RouterContext';

const OverlayedStack = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	minWidth: '33vw',
	minHeight: '50vh',
	textAlign: 'center',
}));

const Home = () => {
	const { navigate } = useRouter();

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
				<Typography
					variant="h6"
					onClick={() => navigate(`/rosters`)}
					sx={{ cursor: 'pointer' }}
				>
					Rosters
				</Typography>
				<Typography
					variant="h6"
					onClick={() => navigate(`/card-reference`)}
					sx={{ cursor: 'pointer' }}
				>
					Card Reference
				</Typography>
				<Typography
					variant="h6"
					onClick={() => navigate(`rules-reference`)}
					sx={{ cursor: 'pointer' }}
				>
					Rules Reference
				</Typography>
				<Typography
					variant="h6"
					onClick={() => navigate(`/collection`)}
					sx={{ cursor: 'pointer' }}
				>
					Collection
				</Typography>
				<Typography
					variant="h6"
					onClick={() => navigate(`/calculator`)}
					sx={{ cursor: 'pointer' }}
				>
					Dice Calculator
				</Typography>
			</OverlayedStack>
		</Stack>
	);
};

export default Home;
