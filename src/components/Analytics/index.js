import React from 'react';
import {
	Paper,
	ListItemText,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CharacterAvatar from '../CharacterAvatar';
import { useRosters } from '../../contexts/RosterContext';
import { getRosterData } from '../../services/analytics';
import toTitleCase from '../../services/titleCase';

const Panel = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	marginTop: theme.spacing(1),
	padding: theme.spacing(1),
}));
const StyledSelect = styled(Select)(({ theme }) => ({
	border: `1px solid ${theme.palette.white.main}`,
	color: theme.palette.white.main,
	backgroundColor: theme.palette.overlay.main,
	'& ul': {
		backgroundColor: theme.palette.overlay.main,
	},
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	'&:hover': {
		backgroundColor: theme.palette.overlay.headerBg,
		color: theme.palette.white.main,
	},
}));

const Analytics = () => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const { selectedRoster } = useRosters();
	const rosterData = getRosterData(selectedRoster);

	const [affiliation, setAffiliation] = React.useState('');
	const [threat, setThreat] = React.useState('');
	const [numChars, setNumChars] = React.useState('');

	const handleSetAffiliation = (e) => {
		setAffiliation(e.target.value);
	};
	const handleSetThreat = (e) => {
		setThreat(e.target.value);
	};
	const handleSetRosterSize = (e) => {
		setNumChars(e.target.value);
	};

	const filteredRosterList = rosterData.possibleRosters.filter((roster) => {
		if (
			affiliation !== '' &&
			!roster.affiliations.includes(affiliation.toUpperCase())
		)
			return false;
		if (threat !== '' && roster.totalThreat !== threat) return false;
		if (numChars !== '' && roster.characters.length !== numChars) return false;
		return true;
	});

	return (
		<>
			<Stack
				direction={isDesktop ? 'row' : 'column'}
				spacing={1}
				justifyContent="space-evenly"
			>
				<FormControl fullWidth>
					<InputLabel id="affiliation">Affiliation</InputLabel>
					<StyledSelect
						labelId="affiliation"
						value={affiliation}
						onChange={handleSetAffiliation}
					>
						<StyledMenuItem value={''}>Any</StyledMenuItem>
						{rosterData.affiliations.map((affiliation) => (
							<StyledMenuItem key={affiliation} value={affiliation}>
								{affiliation}
							</StyledMenuItem>
						))}
					</StyledSelect>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="threat">Threat Level</InputLabel>
					<StyledSelect
						labelId="threat"
						value={threat}
						onChange={handleSetThreat}
					>
						<StyledMenuItem value={''}>Any</StyledMenuItem>
						{[...Array(7).keys()].map((key) => {
							const threatLevel = key + 14;
							return (
								<StyledMenuItem value={threatLevel} key={threatLevel}>
									{threatLevel}
								</StyledMenuItem>
							);
						})}
					</StyledSelect>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="rosterSize">Roster Size</InputLabel>
					<StyledSelect
						labelId="rosterSize"
						value={numChars}
						onChange={handleSetRosterSize}
					>
						<StyledMenuItem value={''}>Any</StyledMenuItem>
						{[...Array(10).keys()].map((key) => (
							<StyledMenuItem value={key + 1} key={key + 1}>
								{key + 1}
							</StyledMenuItem>
						))}
					</StyledSelect>
				</FormControl>
			</Stack>
			<Typography sx={{ mt: 1 }}>
				Showing {filteredRosterList.length} of a possible{' '}
				{rosterData.possibleRosters.length} rosters.
			</Typography>
			{filteredRosterList.map((roster, index) => (
				<Panel key={index}>
					<Stack direction="column" spacing={1} key={index}>
						<ListItemText
							primary={`${roster.affiliations
								.map((a) => toTitleCase(a))
								.join(', or ')} Roster`}
							secondary={`${roster.totalThreat} Threat`}
						/>
						<Stack direction="row" spacing={1}>
							{roster.characters
								.sort((a, b) => {
									const leaders = roster.leaders.map((leader) => leader.id);
									if (leaders.includes(a.id) && !leaders.includes(b.id))
										return -1;
									if (!leaders.includes(a.id) && leaders.includes(b.id))
										return 1;
									return 0;
								})
								.map((character) => (
									<CharacterAvatar
										key={character.id}
										character={character}
										highlight={roster.leaders
											.map((leader) => leader.id)
											.includes(character.id)}
									/>
								))}
						</Stack>
					</Stack>
				</Panel>
			))}
		</>
	);
};

export default Analytics;
