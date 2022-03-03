import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Divider,
	Button,
	Typography,
} from '@mui/material';
import { useRosters } from '../../contexts/RosterContext';
import { useRouter } from '../../contexts/RouterContext';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme';

const RosterList = () => {
	const { getRosters, selectRoster, createRoster } = useRosters();
	const rosters = getRosters();
	const { navigate } = useRouter();

	const handleSelect = (roster) => {
		selectRoster(roster.id);
		navigate(`/rosters/${roster.id}`);
	};

	const handleCreateRoster = () => {
		createRoster('New Roster');
	};

	return (
		<>
			{!rosters ||
				(rosters.length === 0 && (
					<Typography variant="h5" color="white" align="center" mb={1}>
						You have not created any rosters...yet
					</Typography>
				))}
			<List>
				{rosters?.map((roster) => (
					<div
						key={`${roster.id}`}
						onClick={() => handleSelect(roster)}
						style={{ cursor: 'pointer' }}
					>
						<ListItem
							sx={{
								backgroundColor: THEME.palette.overlay.main,
								mb: 1,
							}}
						>
							<ListItemText primary={toTitleCase(roster.name)} />
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				onClick={handleCreateRoster}
			>
				Create New Roster
			</Button>
		</>
	);
};

export default RosterList;
