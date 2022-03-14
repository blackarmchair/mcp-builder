import React from 'react';
import {
	Stack,
	TextField,
	InputAdornment,
	Button,
	Typography,
	Menu,
	MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSearch } from '../../contexts/SearchContext';
import debounce from '../../services/debounce';
import AFFILIATIONS from '../../constants/affiliations.json';
import ChipFilter from '../ChipFilter';

const OverlayedStack = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
	border: '1px solid white',
	color: 'white',
	flexGrow: 1,
}));

const searchFields = [
	// { name: 'healthyStamina', label: 'Stamina' },
	{
		name: 'healthySpeed',
		label: 'Move Speed',
		cmpt: 'Select',
		options: [
			{ label: 'Short', value: 'S' },
			{ label: 'Medium', value: 'M' },
			{ label: 'Long', value: 'L' },
		],
	},
	{
		name: 'healthySize',
		label: 'Size',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
		],
	},
	{
		name: 'healthyThreat',
		label: 'Threat',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
			{ label: '6', value: 6 },
			{ label: '7', value: 7 },
			{ label: '8', value: 8 },
		],
	},
	{
		name: 'affiliations',
		label: 'Affiliation',
		cmpt: 'Select',
		options: AFFILIATIONS.sort((a, b) => {
			if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
			if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
			return 0;
		}).map((affiliation) => ({
			label: affiliation.name,
			value: affiliation.name,
		})),
	},
	{
		name: 'healthyPhysicalDefense',
		label: 'Physical Defense',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
			{ label: '6', value: 6 },
		],
	},
	{
		name: 'healthyEnergyDefense',
		label: 'Energy Defense',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
			{ label: '6', value: 6 },
		],
	},
	{
		name: 'healthyMysticalDefense',
		label: 'Mystical Defense',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
			{ label: '6', value: 6 },
		],
	},
];
const simpleSearchModes = {
	NAME: 'characterName',
	FULL_TEXT: 'fullText',
};

const TextSearchOptionsMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
	},
	'& .MuiMenu-list': {
		padding: '4px 0',
	},
	'& .MuiMenuItem-root': {},
}));

const CharacterSearch = ({ updateQuery, hideNumbers }) => {
	const { allCharacters, characters, isFiltered, reset } = useSearch();
	const [simpleSearchMode, setSimpleSearchMode] = React.useState(
		simpleSearchModes.NAME
	);

	const [textSearchOptsAnchor, setTextSearchOptsAnchor] = React.useState(null);
	const textSearchMenuOpen = Boolean(textSearchOptsAnchor);
	const handleOpenTextSearchMenu = (event) => {
		setTextSearchOptsAnchor(event.currentTarget);
	};
	const handleCloseTextSearchMenu = (mode) => {
		setSimpleSearchMode(mode);
		setTextSearchOptsAnchor(null);
	};

	const handleSimpleSearch = debounce((e) => {
		if (simpleSearchMode === simpleSearchModes.FULL_TEXT) {
			updateQuery([['fullText', e.target.value]], 'characters');
		} else {
			updateQuery([['characterName', e.target.value]], 'characters');
		}
	}, 400);

	const handleReset = () => {
		document.querySelector('input').value = null;
		reset();
	};

	return (
		<OverlayedStack>
			<Stack direction="row" justifyContent="space-between" spacing={2}>
				<StyledTextField
					name="characterName"
					variant="outlined"
					label={
						simpleSearchMode === simpleSearchModes.NAME
							? 'Search Character Name'
							: 'Search Full Text'
					}
					onChange={handleSimpleSearch}
					InputLabelProps={{
						style: { color: 'white' },
					}}
					InputProps={{
						style: { color: 'white' },
						endAdornment: (
							<InputAdornment
								position="start"
								onClick={handleOpenTextSearchMenu}
							>
								<ArrowDropDownIcon color="white" />
							</InputAdornment>
						),
					}}
					autoComplete="off"
				/>
				<TextSearchOptionsMenu
					anchorEl={textSearchOptsAnchor}
					open={textSearchMenuOpen}
					onClose={handleCloseTextSearchMenu}
				>
					<MenuItem
						disableRipple
						onClick={() => handleCloseTextSearchMenu(simpleSearchModes.NAME)}
					>
						Character Name
					</MenuItem>
					<MenuItem
						disableRipple
						onClick={() =>
							handleCloseTextSearchMenu(simpleSearchModes.FULL_TEXT)
						}
					>
						Full-Text
					</MenuItem>
				</TextSearchOptionsMenu>
			</Stack>
			<Stack
				direction="row"
				spacing={1}
				mt={2}
				mb={1}
				sx={{ maxWidth: '100%', overflow: 'scroll' }}
			>
				{searchFields.map((field) => (
					<ChipFilter
						key={field.name}
						name={field.name}
						label={field.label}
						filterOptions={field.options}
						handleFilter={(value) =>
							updateQuery([[field.name, value]], 'characters')
						}
					/>
				))}
			</Stack>
			{isFiltered && (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ mt: 2 }}
				>
					{!hideNumbers && (
						<Typography>
							Showing {characters.length} of {allCharacters.length} characters.
						</Typography>
					)}
					<Button variant="outlined" color="white" onClick={handleReset}>
						Reset Search
					</Button>
				</Stack>
			)}
		</OverlayedStack>
	);
};

export default CharacterSearch;
