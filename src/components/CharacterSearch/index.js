import React from 'react';
import {
	Stack,
	IconButton,
	TextField,
	InputAdornment,
	Button,
	Typography,
	Menu,
	MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/More';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AdvancedSearchModal from '../AdvancedSearchModal';
import { useSearch } from '../../contexts/SearchContext';
import debounce from '../../services/debounce';
import AFFILIATIONS from '../../constants/affiliations.json';

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
	{ name: 'healthyStamina', label: 'Stamina' },
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
	{ name: 'healthySize', label: 'Size' },
	{ name: 'healthyThreat', label: 'Threat' },
	{
		name: 'affiliations',
		label: 'Affiliation',
		cmpt: 'Select',
		options: AFFILIATIONS.map((affiliation) => ({
			label: affiliation,
			value: affiliation,
		})),
	},
	{ name: 'healthyPhysicalDefense', label: 'Physical Defense' },
	{ name: 'healthyEnergyDefense', label: 'Energy Defense' },
	{ name: 'healthyMysticalDefense', label: 'Mystical Defense' },
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
	const [advancedSearch, setAdvancedSearch] = React.useState(false);
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

	const toggleAdvancedSearch = () => {
		setAdvancedSearch((prevState) => !prevState);
	};

	const handleSimpleSearch = debounce((e) => {
		if (simpleSearchMode === simpleSearchModes.FULL_TEXT) {
			updateQuery([['fullText', e.target.value]], 'characters');
		} else {
			updateQuery([['characterName', e.target.value]], 'characters');
		}
	}, 400);

	const handleUpdateQuery = (query) => {
		let parsedQuery = [];
		Object.keys(query).forEach((key) => {
			const entry = query[key];
			if (!!entry && !isNaN(entry)) parsedQuery.push([key, parseInt(entry)]);
			else if (!!entry && isNaN(entry)) parsedQuery.push([key, entry]);
		});

		toggleAdvancedSearch();
		updateQuery(parsedQuery, 'characters');
	};

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
					autoFocus
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
				<IconButton onClick={toggleAdvancedSearch} size="large">
					<MoreIcon color="white" />
				</IconButton>
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
			<AdvancedSearchModal
				open={advancedSearch}
				toggle={toggleAdvancedSearch}
				submit={handleUpdateQuery}
				searchFields={searchFields}
			/>
		</OverlayedStack>
	);
};

export default CharacterSearch;
