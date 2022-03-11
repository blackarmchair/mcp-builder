import React from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearch } from '../../contexts/SearchContext';
import debounce from '../../services/debounce';
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
	{
		name: 'threat',
		label: 'Threat Level',
		options: [
			{ label: '14', value: 14 },
			{ label: '15', value: 15 },
			{ label: '16', value: 16 },
			{ label: '17', value: 17 },
			{ label: '18', value: 18 },
			{ label: '19', value: 19 },
			{ label: '20', value: 20 },
		],
	},
	{
		name: 'type',
		label: 'Type',
		cmpt: 'Select',
		options: [
			{ label: 'Secure', value: 'Secure' },
			{ label: 'Extract', value: 'Extraction' },
		],
	},
	{
		name: 'banned',
		label: 'Banned',
		cmpt: 'Select',
		options: [
			{ label: 'Yes', value: true },
			{ label: 'No', value: false },
		],
	},
];

const CrisesSearch = ({ updateQuery, hideNumbers }) => {
	const { allCrises, crises, isFiltered, reset } = useSearch();

	const handleSimpleSearch = debounce((e) => {
		updateQuery([['name', e.target.value]], 'crises');
	}, 400);

	const handleReset = () => {
		document.querySelector('input').value = null;
		reset();
	};

	return (
		<OverlayedStack>
			<Stack direction="row" justifyContent="space-between" spacing={2}>
				<StyledTextField
					name="name"
					variant="outlined"
					label="Search"
					onChange={handleSimpleSearch}
					InputLabelProps={{
						style: { color: 'white' },
					}}
					InputProps={{
						style: { color: 'white' },
					}}
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
					sx={{ mt: 2 }}
				>
					{!hideNumbers && (
						<Typography>
							Showing {crises.length} of {allCrises.length} Team Tactics.
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

export default CrisesSearch;
