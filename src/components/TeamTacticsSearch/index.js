import React from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
	// { name: 'rules', label: 'Card Text' },
	{
		name: 'affiliation',
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
		name: 'type',
		label: 'Type',
		cmpt: 'Select',
		options: [
			{ label: 'Active', value: 'Active' },
			{ label: 'Reactive', value: 'Reactive' },
		],
	},
	{
		name: 'standardStatus',
		label: 'Standard Status',
		cmpt: 'Select',
		options: [
			{ label: 'Unrestricted', value: 'legal' },
			{ label: 'Restricted', value: 'restricted' },
			{ label: 'Banned', value: 'banned' },
		],
	},
];

const TeamTacticsSearch = ({ updateQuery, hideNumbers }) => {
	const { allTeamTactics, teamTactics, isFiltered, reset } = useSearch();

	const handleSimpleSearch = debounce((e) => {
		updateQuery([['name', e.target.value]], 'teamTactics');
	}, 400);

	const handleReset = () => {
		document.querySelector('input[name="tacticName"]').value = null;
		reset();
	};

	return (
		<OverlayedStack>
			<Stack direction="row" justifyContent="space-between" spacing={2}>
				<StyledTextField
					name="tacticName"
					variant="outlined"
					label="Search"
					onChange={handleSimpleSearch}
					InputLabelProps={{
						style: { color: 'white' },
					}}
					InputProps={{
						style: { color: 'white' },
					}}
					autoComplete="off"
				/>
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
							updateQuery([[field.name, value]], 'teamTactics')
						}
					/>
				))}
			</Stack>
			{isFiltered && (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ mt: 1 }}
				>
					{!hideNumbers && (
						<Typography>
							Showing {teamTactics.length} of {allTeamTactics.length} Team
							Tactics.
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

export default TeamTacticsSearch;
