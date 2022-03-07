import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Divider,
	Typography,
} from '@mui/material';
import CrisesCardDetail from '../CrisesCardDetail';
import { useSearch } from '../../contexts/SearchContext';
import THEME from '../../theme';

const CrisesList = ({ clickDisposition, handleSelection, preclude }) => {
	const { crises } = useSearch();
	const [detailModal, setDetailModal] = React.useState(false);
	const precluded = Array.isArray(preclude) ? preclude : [];
	const toggleDetailModal = () => {
		setDetailModal((prevState) => !prevState);
	};
	const [selectedCard, setSelectedCard] = React.useState();
	const handleSelectCard = (card) => {
		if (clickDisposition === 'select') handleSelection(card.id);
		else {
			setSelectedCard(card);
			toggleDetailModal();
		}
	};

	return (
		<List>
			{crises
				.filter((crisis) => !precluded.includes(crisis.id))
				.map((crisis) => (
					<div
						key={`${crisis.id}`}
						onClick={() => handleSelectCard(crisis)}
						style={{ cursor: 'pointer' }}
					>
						<ListItem
							sx={{
								backgroundColor: THEME.palette.overlay.main,
								mb: 1,
							}}
							secondaryAction={<Typography>{crisis.threat}</Typography>}
						>
							<ListItemAvatar sx={{ mr: { xs: 0, mb: 1 } }}>
								<Avatar
									sx={{
										backgroundColor: !crisis.type.localeCompare('Extraction')
											? THEME.palette.phys.main
											: THEME.palette.myst.main,
										color: !crisis.type.localeCompare('Extraction')
											? THEME.palette.phys.contrastColor
											: THEME.palette.myst.contrastColor,
									}}
								>
									{crisis.type.substr(0, 1)}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={crisis.name}
								primaryTypographyProps={{
									color: crisis.banned
										? THEME.palette.phys.main
										: crisis.restricted
										? THEME.palette.enrg.main
										: THEME.palette.white.main,
								}}
								secondaryTypographyProps={{
									color: crisis.banned
										? `${THEME.palette.phys.main} !important`
										: crisis.restricted
										? `${THEME.palette.enrg.main} !important`
										: THEME.palette.white.main,
								}}
							/>
						</ListItem>
						<Divider />
					</div>
				))}
			<CrisesCardDetail
				open={detailModal}
				toggle={toggleDetailModal}
				card={selectedCard}
			/>
		</List>
	);
};

export default CrisesList;
