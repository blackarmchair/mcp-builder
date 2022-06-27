import React from 'react';
import { Stack, Grid } from '@mui/material';
import { useRouter } from '../../contexts/RouterContext';
import PageTile from '../../components/PageTile';

import ListAltIcon from '@mui/icons-material/ListAlt';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BookIcon from '@mui/icons-material/Book';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const Home = () => {
	const { navigate } = useRouter();

	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: 'calc(100vh - 64px)' }}
		>
			<Grid
				container
				spacing={2}
				style={{ paddingLeft: '5vw', paddingRight: '5vw' }}
			>
				<PageTile
					label="Rosters"
					icon={<ListAltIcon color="white" fontSize="large" />}
					handleClick={() => navigate('/rosters')}
				/>
				<PageTile
					label="Card Reference"
					icon={<FeaturedPlayListIcon color="white" fontSize="large" />}
					handleClick={() => navigate('/card-reference')}
				/>
				<PageTile
					label="Misc. Reference"
					icon={<AllInclusiveIcon color="white" fontSize="large" />}
					handleClick={() => navigate('/misc-reference')}
				/>
				<PageTile
					label="Rule Reference"
					icon={<BookIcon color="white" fontSize="large" />}
					handleClick={() => navigate('/rules-reference')}
				/>
				<PageTile
					label="Collection"
					icon={<CollectionsBookmarkIcon color="white" fontSize="large" />}
					handleClick={() => navigate('/collection')}
				/>
			</Grid>
		</Stack>
	);
};

export default Home;
