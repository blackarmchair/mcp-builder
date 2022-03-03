import React from 'react';
import {
	ToggleButtonGroup,
	ToggleButton,
	Stack,
	TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCharacters from './AddCharacters';
import AddTeamTactics from './AddTeamTactics';
import AddCrises from './AddCrises';
import ActionBar from './ActionBar';
import { useRosters } from '../../contexts/RosterContext';
import debounce from '../../services/debounce';

const cardTypes = ['Characters', 'Tactics', 'Crises'];

const StyledButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	marginTop: theme.spacing(1),
	[theme.breakpoints.down('sm')]: {
		marginBottom: theme.spacing(1),
	},
	backgroundColor: theme.palette.overlay.main,
	width: '100%',
	display: 'flex',
	flex: '0 1 auto',
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	flexGrow: 1,
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
	color: theme.palette.white.main,
	flexGrow: 1,
	backgroundColor: theme.palette.overlay.main,
	flex: '0 1 auto',
}));

const Rosters = () => {
	const { selectedRoster, createRoster, updateRoster } = useRosters();
	const [isFreshRoster, setIsFreshRoster] = React.useState(!selectedRoster);
	const [selectedCategory, setSelectedCategory] = React.useState(cardTypes[0]);

	const handleSelect = (event, newSelection) => {
		if (newSelection !== null) setSelectedCategory(newSelection);
	};

	const handleChangeRosterName = debounce((event) => {
		const name = event.target.value;
		if (isFreshRoster) {
			createRoster(name);
			setIsFreshRoster(false);
		} else {
			updateRoster({ ...selectedRoster, name });
		}
	}, 400);

	return (
		<>
			<StyledTextField
				name="rosterName"
				variant="filled"
				label="Roster Name"
				InputLabelProps={{
					style: { color: 'white' },
				}}
				InputProps={{
					style: { color: 'white' },
				}}
				fullWidth
				onChange={(e) => handleChangeRosterName(e)}
				defaultValue={selectedRoster.name}
			/>
			<Stack direction="row" justifyContent="space-around">
				<StyledButtonGroup
					color="white"
					value={selectedCategory}
					exclusive
					onChange={handleSelect}
				>
					{cardTypes.map((type) => (
						<StyledToggleButton key={type} value={type}>
							{type}
						</StyledToggleButton>
					))}
				</StyledButtonGroup>
			</Stack>

			<div style={{ overflow: 'scroll', flex: '1 1 auto' }}>
				{selectedCategory === cardTypes[0] && <AddCharacters />}
				{selectedCategory === cardTypes[1] && <AddTeamTactics />}
				{selectedCategory === cardTypes[2] && <AddCrises />}
			</div>

			<ActionBar />
		</>
	);
};

export default Rosters;
