import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Divider,
} from '@mui/material';
import GemAvatar from '../GemAvatar';
import GemDetail from '../GemDetail';
import THEME from '../../theme';
import GEMS from '.././../constants/gems.json';

const GemList = () => {
	const [detailModal, setDetailModal] = React.useState(false);
	const toggleDetailModal = () => {
		setDetailModal((prevState) => !prevState);
	};
	const [selectedGem, setSelectedGem] = React.useState();
	const handleSelectGem = (gem) => {
		setSelectedGem(gem);
		toggleDetailModal();
	};

	return (
		<>
			<List>
				{GEMS.map((gem) => (
					<div
						key={gem.id}
						style={{ cursor: 'pointer' }}
						onClick={() => handleSelectGem(gem)}
					>
						<ListItem
							sx={{
								backgroundColor: THEME.palette.overlay.main,
								mb: 1,
							}}
							id={gem.id}
						>
							<ListItemAvatar>
								<GemAvatar gem={gem} />
							</ListItemAvatar>
							<ListItemText primary={gem.characterName} />
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
			<GemDetail
				open={detailModal}
				toggle={toggleDetailModal}
				gem={selectedGem}
			/>
		</>
	);
};

export default GemList;
