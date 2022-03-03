import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	Paper,
	Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { copyTextToClipboard } from '../../services/copy';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
	color: theme.palette.white.main,
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(2),
}));
const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: '#000 !important',
	padding: theme.spacing(2),
}));

const ShareRosterDialog = ({ open, toggle, shareLink, copyRoster }) => {
	const handleCopyLink = () => {
		copyTextToClipboard(shareLink);
		toggle();
	};
	const handleCopyRoster = () => {
		copyRoster();
		toggle();
	};

	return (
		<Dialog
			open={open}
			onClose={toggle}
			maxWidth="sm"
			fullWidth
			PaperProps={{ component: StyledPaper }}
		>
			<StyledDialogTitle>Share This Roster</StyledDialogTitle>
			<StyledDialogContent>
				<Stack direction="column" spacing={4}>
					<Button
						variant="primary"
						startIcon={<LinkIcon />}
						onClick={handleCopyLink}
						fullWidth
					>
						Get Shareable Link
					</Button>
					<Button
						variant="primary"
						startIcon={<ContentPasteIcon />}
						onClick={handleCopyRoster}
						fullWidth
					>
						Copy to Clipboard
					</Button>
				</Stack>
			</StyledDialogContent>
		</Dialog>
	);
};

export default ShareRosterDialog;
