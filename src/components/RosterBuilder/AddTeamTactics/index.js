import React from 'react';
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TeamTacticsList from '../../TeamTacticsList';
import TeamTacticsSearch from '../../TeamTacticsSearch';
import TeamTacticsCardDetail from '../../TeamTacticsDetail';
import { useRosters } from '../../../contexts/RosterContext';
import { useSearch } from '../../../contexts/SearchContext';
import toTitleCase from '../../../services/titleCase';
import THEME from '../../../theme';

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

const TEAM_TACTICS_LIMIT = 10;

const AddTeamTacticsModal = ({ open, toggle, addTeamTactic }) => {
	const { search, teamTactics, reset } = useSearch();
	const { selectedRoster } = useRosters();
	const handleAddTeamTactic = (tactic) => {
		addTeamTactic(tactic);
		if (teamTactics.length === 1) reset();
	};
	return (
		<StyledDialog open={open} onClose={toggle}>
			<StyledDialogTitle>
				<Stack direction="row" justifyContent="space-between">
					Add Team Tactics Card
					<IconButton color="white" onClick={toggle}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</StyledDialogTitle>
			<StyledDialogContent>
				<TeamTacticsSearch updateQuery={search} hideNumbers />
				<TeamTacticsList
					clickDisposition="select"
					handleSelection={(ttc) => handleAddTeamTactic(ttc)}
					preclude={selectedRoster.teamTactics}
				/>
			</StyledDialogContent>
		</StyledDialog>
	);
};

const AddTeamTactics = () => {
	const { allTeamTactics } = useSearch();
	const { selectedRoster, updateRoster } = useRosters();
	const [addTeamTacticsModal, setAddTeamTacticsModal] = React.useState(false);
	const [selectedTeamTacticsCard, setSelectedTeamTacticsCard] =
		React.useState();

	const toggleAddTeamTacticsModal = () => {
		setAddTeamTacticsModal((prevState) => !prevState);
	};

	const handleAddTeamTacticsCard = (card) => {
		updateRoster({
			...selectedRoster,
			teamTactics: [...selectedRoster.teamTactics, card.id],
		});
		toggleAddTeamTacticsModal();
	};

	const handleRemoveTeamTacticsCard = (e, card) => {
		e.stopPropagation();
		updateRoster({
			...selectedRoster,
			teamTactics: selectedRoster.teamTactics.filter((c) =>
				c.localeCompare(card.id)
			),
		});
	};

	const handleSelectTeamTacticsCard = (card) => {
		setSelectedTeamTacticsCard(card);
	};

	const handleDeselectTeamTacticsCard = () => {
		setSelectedTeamTacticsCard(null);
	};

	return (
		<Panel>
			<List>
				{selectedRoster.teamTactics.map((id) => {
					const teamTactic = allTeamTactics.find(
						(c) => !c.id.localeCompare(id)
					);
					const banned = teamTactic.standardStatus === 'banned';
					const rotated = teamTactic.standardStatus === 'rotated';
					const restricted = teamTactic.standardStatus === 'restricted';
					return (
						<div key={id} style={{ cursor: 'pointer' }}>
							<ListItem
								sx={{
									backgroundColor: 'transparent',
									mb: 1,
								}}
								onClick={() => handleSelectTeamTacticsCard(teamTactic)}
								secondaryAction={
									<IconButton
										edge="end"
										color="white"
										onClick={(e) => handleRemoveTeamTacticsCard(e, teamTactic)}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={teamTactic.name}
									secondary={toTitleCase(teamTactic.affiliation)}
									primaryTypographyProps={{
										color:
											banned || rotated
												? THEME.palette.phys.main
												: restricted
												? THEME.palette.enrg.main
												: THEME.palette.white.main,
									}}
									secondaryTypographyProps={{
										color:
											banned || rotated
												? `${THEME.palette.phys.main} !important`
												: restricted
												? `${THEME.palette.enrg.main} !important`
												: THEME.palette.white.main,
									}}
								/>
							</ListItem>
						</div>
					);
				})}
				{Array(TEAM_TACTICS_LIMIT - selectedRoster?.teamTactics?.length)
					.fill('')
					.map((slot, idx) => (
						<ListItem
							key={idx}
							onClick={toggleAddTeamTacticsModal}
							secondaryAction={
								<IconButton edge="end" color="white">
									<AddIcon />
								</IconButton>
							}
							sx={{ cursor: 'pointer' }}
						>
							<ListItemText primary="Add Team Tactics Card" />
						</ListItem>
					))}
			</List>
			<AddTeamTacticsModal
				open={addTeamTacticsModal}
				toggle={toggleAddTeamTacticsModal}
				addTeamTactic={(teamTactic) => handleAddTeamTacticsCard(teamTactic)}
			/>
			<TeamTacticsCardDetail
				open={!!selectedTeamTacticsCard}
				toggle={handleDeselectTeamTacticsCard}
				card={selectedTeamTacticsCard}
			/>
		</Panel>
	);
};

export default AddTeamTactics;
