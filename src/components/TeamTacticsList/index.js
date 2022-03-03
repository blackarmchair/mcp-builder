import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import TeamTacticsCardDetail from '../TeamTacticsDetail';
import { useSearch } from '../../contexts/SearchContext';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme';

const TeamTacticsList = ({ clickDisposition, handleSelection, preclude }) => {
	const { teamTactics } = useSearch();
	const precluded = Array.isArray(preclude) ? preclude : [];
	const [detailModal, setDetailModal] = React.useState(false);
	const toggleDetailModal = () => {
		setDetailModal((prevState) => !prevState);
	};
	const [selectedCard, setSelectedCard] = React.useState();
	const handleSelectCard = (card) => {
		if (clickDisposition === 'select') handleSelection(card);
		else {
			setSelectedCard(card);
			toggleDetailModal();
		}
	};

	return (
		<List>
			{teamTactics
				.filter((tactic) => !precluded.includes(tactic.id))
				.map((tactic) => (
					<div
						key={`${tactic.id}`}
						onClick={() => handleSelectCard(tactic)}
						style={{ cursor: 'pointer' }}
					>
						<ListItem
							sx={{
								backgroundColor: THEME.palette.overlay.main,
								mb: 1,
							}}
						>
							<ListItemText
								primary={tactic.name}
								secondary={toTitleCase(tactic.affiliation)}
								primaryTypographyProps={{
									color: tactic.banned
										? THEME.palette.phys.main
										: tactic.restricted
										? THEME.palette.enrg.main
										: THEME.palette.white.main,
								}}
								secondaryTypographyProps={{
									color: tactic.banned
										? `${THEME.palette.phys.main} !important`
										: tactic.restricted
										? `${THEME.palette.enrg.main} !important`
										: THEME.palette.white.main,
								}}
							/>
						</ListItem>
						<Divider />
					</div>
				))}
			<TeamTacticsCardDetail
				open={detailModal}
				toggle={toggleDetailModal}
				card={selectedCard}
			/>
		</List>
	);
};

export default TeamTacticsList;
