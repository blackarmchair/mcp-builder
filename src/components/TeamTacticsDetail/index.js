import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Divider,
	Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toTitleCase from '../../services/titleCase';
import parseRulesText from '../../services/parseSpecialRules';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
}));
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
}));
const Subheader = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	paddingLeft: theme.spacing(2),
	fontSize: 'small',
}));
const StyledDivider = styled(Divider)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	borderColor: theme.palette.white.main,
	marginTop: theme.spacing(1),
}));
const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: `${theme.palette.overlay.main} !important`,
	padding: theme.spacing(2),
}));

const TeamTacticsCardDetail = ({ open, toggle, card }) => {
	return (
		<Dialog
			open={open}
			onClose={toggle}
			maxWidth="sm"
			fullWidth
			PaperProps={{ component: StyledPaper }}
		>
			<StyledDialogTitle sx={{ pb: 0 }}>
				{toTitleCase(card?.name)}
			</StyledDialogTitle>
			<Subheader>
				Type: {card?.type} | Affiliation: {card?.affiliation} | Restricted:{' '}
				{card?.restricted ? 'Yes' : 'No'} | Banned:{' '}
				{card?.banned ? 'Yes' : 'No'}
			</Subheader>
			<StyledDivider />
			<StyledDialogContent>
				<Typography>{parseRulesText(card?.rules)}</Typography>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button variant="contained" color="secondary" onClick={toggle}>
					Close
				</Button>
			</StyledDialogActions>
		</Dialog>
	);
};

export default TeamTacticsCardDetail;
