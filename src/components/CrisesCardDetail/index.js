import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Divider,
	Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toTitleCase from '../../services/titleCase';
import parseRulesText from '../../services/parseSpecialRules';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const Subheader = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	paddingLeft: theme.spacing(1),
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

const CardEntry = ({ label, value, secondary }) => (
	<ListItem secondaryAction={secondary && <Typography>{value}</Typography>}>
		<ListItemText primary={label} secondary={!secondary && value} />
	</ListItem>
);

const CrisesCardDetail = ({ open, toggle, card }) => {
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
				Type: {card?.type} | Threat {card?.threat} | Banned:{' '}
				{card?.banned ? 'Yes' : 'No'}
			</Subheader>
			<StyledDivider />
			<StyledDialogContent>
				<List>
					<CardEntry label="" value={parseRulesText(card?.setup)} />
					<CardEntry label="" value={parseRulesText(card?.scoring)} />
					<CardEntry label="" value={parseRulesText(card?.details)} />
				</List>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button variant="contained" color="secondary" onClick={toggle}>
					Close
				</Button>
			</StyledDialogActions>
		</Dialog>
	);
};

export default CrisesCardDetail;
