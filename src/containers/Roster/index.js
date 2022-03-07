import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Hidden } from '@mui/material';
import { useRosters } from '../../contexts/RosterContext';
import { useSearch } from '../../contexts/SearchContext';
import PageContainer from '../../components/PageContainer';
import RosterBuilder from '../../components/RosterBuilder';

const Roster = () => {
	const { id } = useParams();
	const { selectRoster, selectedRoster } = useRosters();
	const { resetLastAccessedCharacter } = useSearch();

	React.useEffect(() => {
		if (selectedRoster === undefined || selectedRoster?.id?.localeCompare(id)) {
			selectRoster(id);
		}
		resetLastAccessedCharacter();
	}, [id, selectRoster, selectedRoster, resetLastAccessedCharacter]);

	return (
		<>
			<Hidden mdUp>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: 'calc(100vh - 56px)',
						overflow: 'hidden',
						maxWidth: 900,
						paddingLeft: '12px',
						paddingRight: '12px',
					}}
				>
					{!!selectedRoster && <RosterBuilder />}
				</Box>
			</Hidden>
			<Hidden smDown>
				<PageContainer>{!!selectedRoster && <RosterBuilder />}</PageContainer>
			</Hidden>
		</>
	);
};

export default Roster;
