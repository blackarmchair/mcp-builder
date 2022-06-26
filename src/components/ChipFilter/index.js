import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearch } from '../../contexts/SearchContext';

const StyledChip = styled(Chip)(({ theme }) => ({
	'& .MuiChip-label': {
		color: theme.palette.white.main,
	},
	'& .MuiSvgIcon-root': {
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
		color: theme.palette.white.main,
		'&:hover': {
			color: theme.palette.white.main,
		},
	},
}));

const ChipFilter = ({ label, name, filterOptions, handleFilter }) => {
	const { currentSearchTerms } = useSearch();
	const [anchorElement, setAnchorElement] = React.useState(null);
	const menuOpen = Boolean(anchorElement);
	const handleMenuOpen = (event) => {
		setAnchorElement(event.currentTarget);
	};
	const handleMenuSelection = (selection) => {
		handleFilter(selection);
		setAnchorElement(null);
	};
	const handleClearFilter = () => {
		handleFilter(undefined);
		setAnchorElement(null);
	};
	const handleMenuClose = () => {
		setAnchorElement(null);
	};

	const currentFilter = currentSearchTerms.find(
		(term) => !term[0].localeCompare(name)
	)?.[1];
	const currentFilterLabel =
		typeof currentFilter === 'string' ? currentFilter : currentFilter?.label;

	return (
		<>
			<StyledChip
				label={!!currentFilter ? `${label}: ${currentFilterLabel}` : label}
				onClick={handleMenuOpen}
				onDelete={!!currentFilter ? handleClearFilter : undefined}
				variant={!!currentFilter ? 'filled' : 'outlined'}
			/>
			<Menu
				id={label}
				anchorEl={anchorElement}
				open={menuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem value="" onClick={handleClearFilter}>
					Any
				</MenuItem>
				{filterOptions.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
						onClick={() => handleMenuSelection(option.value)}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

ChipFilter.defaultProps = {
	handleFilter: () => null,
};
ChipFilter.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	filterOptions: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]).isRequired,
		})
	).isRequired,
	handleFilter: PropTypes.func,
};

export default ChipFilter;
