import React from 'react';
import { Stack, IconButton, Tooltip, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ShareRosterDialog from '../../ShareRosterDialog';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useRosters } from '../../../contexts/RosterContext';
import { useRouter } from '../../../contexts/RouterContext';
import { useToast } from '../../../contexts/ToastContext';
import formatRoster from '../../../services/formatRoster';

const Panel = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	marginTop: theme.spacing(1),
	padding: theme.spacing(1),
	flex: '0 1 auto',
}));

const ActionBar = () => {
	const { selectedRoster, clearSelectedRoster, copyRoster, deleteRoster } =
		useRosters();
	const { navigate } = useRouter();
	const { postMessage } = useToast();
	const [shareRoster, setShareRoster] = React.useState(false);
	const [shareLink, setShareLink] = React.useState();

	const handleCopyRoster = () => {
		copyRoster(selectedRoster.id);
		clearSelectedRoster();
		navigate('/rosters');
	};

	const handleDeleteRoster = () => {
		// eslint-disable-next-line no-restricted-globals
		const c = confirm('Are you sure you want to delete this roster?');
		if (c) {
			deleteRoster(selectedRoster.id);
			clearSelectedRoster();
			navigate('/rosters');
		}
	};

	const handleShareRoster = () => {
		const blob = btoa(JSON.stringify(selectedRoster));
		setShareLink(`${window.location.host}/import/${blob}`);
		setShareRoster(true);
	};

	const handleCopyRosterToClipboard = () => {
		formatRoster(selectedRoster);
		postMessage('Copied to clipboard');
	};

	return (
		<>
			<Panel sx={{ mb: 3 }}>
				<Stack direction="row" spacing={1} justifyContent="space-around">
					<Tooltip title="Make a Copy">
						<IconButton color="white" onClick={handleCopyRoster}>
							<FileCopyIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton color="white" onClick={handleDeleteRoster}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Analytics">
						<IconButton
							color="white"
							onClick={() => navigate(`/analytics/${selectedRoster.id}`)}
						>
							<AnalyticsIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Share">
						<IconButton color="white" onClick={handleShareRoster}>
							<ShareIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Panel>
			<ShareRosterDialog
				open={shareRoster}
				toggle={() => setShareRoster(false)}
				shareLink={shareLink}
				copyRoster={() => handleCopyRosterToClipboard()}
			/>
		</>
	);
};

export default ActionBar;
