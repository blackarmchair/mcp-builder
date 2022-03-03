import React from 'react';
import { ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearch } from '../../contexts/SearchContext';
import PageContainer from '../../components/PageContainer';
import CharacterList from '../../components/CharacterList';
import CharacterSearch from '../../components/CharacterSearch';
import TeamTacticsList from '../../components/TeamTacticsList';
import TeamTacticsSearch from '../../components/TeamTacticsSearch';
import CrisesList from '../../components/CrisesList';
import CrisesSearch from '../../components/CrisesSearch';

const cardTypes = ['Characters', 'Team Tactics', 'Crises'];

const StyledButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	marginTop: theme.spacing(1),
	backgroundColor: theme.palette.overlay.main,
	width: '100%',
	display: 'flex',
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	flexGrow: 1,
}));

const CardReference = () => {
	const { search } = useSearch();
	const [selectedCategory, setSelectedCategory] = React.useState(cardTypes[0]);
	const handleSelect = (event, newSelection) => {
		setSelectedCategory(newSelection);
	};

	return (
		<PageContainer>
			{selectedCategory === cardTypes[0] && (
				<CharacterSearch updateQuery={search} />
			)}
			{selectedCategory === cardTypes[1] && (
				<TeamTacticsSearch updateQuery={search} />
			)}
			{selectedCategory === cardTypes[2] && (
				<CrisesSearch updateQuery={search} />
			)}

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

			{selectedCategory === cardTypes[0] && <CharacterList />}
			{selectedCategory === cardTypes[1] && <TeamTacticsList />}
			{selectedCategory === cardTypes[2] && <CrisesList />}
		</PageContainer>
	);
};

export default CardReference;
