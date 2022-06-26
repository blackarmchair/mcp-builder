import {
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Divider,
	Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
}));
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
}));
export const Subheader = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	paddingLeft: theme.spacing(2),
	fontSize: 'small',
}));
export const StyledDivider = styled(Divider)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	borderColor: theme.palette.white.main,
	marginTop: theme.spacing(1),
}));
export const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: `${theme.palette.overlay.main} !important`,
	padding: theme.spacing(2),
}));
