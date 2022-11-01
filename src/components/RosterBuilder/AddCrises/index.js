import React from 'react';
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
	Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CrisesList from '../../CrisesList';
import CrisesSearch from '../../CrisesSearch';
import CrisesCardDetail from '../../CrisesCardDetail';
import { useRosters } from '../../../contexts/RosterContext';
import { useSearch } from '../../../contexts/SearchContext';
import THEME from '../../../theme';
import truncate from '../../../services/truncate';
import toTitleCase from '../../../services/titleCase';

const Panel = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	marginTop: theme.spacing(1),
	padding: theme.spacing(1),
}));
const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		[theme.breakpoints.down('sm')]: {
			maxWidth: '100vw',
			maxHeight: '100vh',
			margin: 0,
		},
	},
}));
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));

const CRISES_LIMIT = 6;

const AddCrisesModal = ({ open, toggle, addCrisis }) => {
	const { search, reset, crises } = useSearch();
	const { selectedRoster } = useRosters();
	const handleAddCrisis = (crisis) => {
		addCrisis(crisis);
		if (crises.length === 1) reset();
	};
	return (
		<StyledDialog open={open} onClose={toggle}>
			<StyledDialogTitle>
				<Stack direction="row" justifyContent="space-between">
					Add Crisis Card
					<IconButton color="white" onClick={toggle}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</StyledDialogTitle>
			<StyledDialogContent>
				<CrisesSearch updateQuery={search} hideNumbers />
				<CrisesList
					clickDisposition="select"
					handleSelection={(crisis) => handleAddCrisis(crisis)}
					preclude={selectedRoster.crises}
				/>
			</StyledDialogContent>
		</StyledDialog>
	);
};

const AddCrises = () => {
	const { allCrises } = useSearch();
	const { selectedRoster, updateRoster } = useRosters();
	const [addCrisesModal, setAddCrisesModal] = React.useState(false);
	const [selectedCrisisCard, setSelectedCrisisCard] = React.useState();

	const toggleAddCrisisModal = () => {
		setAddCrisesModal((prevState) => !prevState);
	};

	const handleAddCrisisCard = (card) => {
		updateRoster({
			...selectedRoster,
			crises: [...selectedRoster.crises, card],
		});
		toggleAddCrisisModal();
	};

	const handleRemoveCrisisCard = (e, card) => {
		e.stopPropagation();
		updateRoster({
			...selectedRoster,
			crises: selectedRoster.crises.filter((c) => c.localeCompare(card.id)),
		});
	};

	const handleSelectCrisisCard = (card) => {
		setSelectedCrisisCard(card);
	};

	const handleDeselectCrisisCard = () => {
		setSelectedCrisisCard(null);
	};

	return (
		<Panel>
			<List>
				{selectedRoster.crises.map((id) => {
					const crisis = allCrises.find((c) => !c.id.localeCompare(id));
					return (
						<div key={id} style={{ cursor: 'pointer' }}>
							<ListItem
								sx={{
									backgroundColor: 'transparent',
									mb: 1,
								}}
								onClick={() => handleSelectCrisisCard(crisis)}
								secondaryAction={
									<IconButton
										edge="end"
										color="white"
										onClick={(e) => handleRemoveCrisisCard(e, crisis)}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								<ListItemAvatar sx={{ mr: { xs: 0, md: 2 } }}>
									<Avatar
										sx={{
											backgroundColor: !crisis.type.localeCompare('Extraction')
												? THEME.palette.phys.main
												: THEME.palette.myst.main,
											color: !crisis.type.localeCompare('Extraction')
												? THEME.palette.phys.contrastColor
												: THEME.palette.myst.contrastColor,
											width: { xs: 24, md: 40 },
											height: { xs: 24, md: 40 },
											fontSize: { xs: 12, md: 'inherit' },
										}}
									>
										{crisis.type.substr(0, 1)}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={toTitleCase(crisis.name)}
									secondary={`Threat Level: ${crisis.threat} | Map: ${crisis.map}`}
									primaryTypographyProps={{
										color: crisis.banned
											? THEME.palette.phys.main
											: crisis.restricted
											? THEME.palette.enrg.main
											: THEME.palette.white.main,
										sx: {
											...truncate.sx,
										},
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
						</div>
					);
				})}
				{Array(CRISES_LIMIT - selectedRoster?.crises?.length)
					.fill('')
					.map((slot, idx) => (
						<ListItem
							key={idx}
							onClick={toggleAddCrisisModal}
							secondaryAction={
								<IconButton edge="end" color="white">
									<AddIcon />
								</IconButton>
							}
							sx={{ cursor: 'pointer' }}
						>
							<ListItemText primary="Add Crisis Card" />
						</ListItem>
					))}
			</List>
			<AddCrisesModal
				open={addCrisesModal}
				toggle={toggleAddCrisisModal}
				addCrisis={(crisis) => handleAddCrisisCard(crisis)}
			/>
			<CrisesCardDetail
				open={!!selectedCrisisCard}
				toggle={handleDeselectCrisisCard}
				card={selectedCrisisCard}
			/>
		</Panel>
	);
};

export default AddCrises;
