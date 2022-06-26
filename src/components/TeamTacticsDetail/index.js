import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const TeamTacticsCardDetail = ({ open, toggle, card }) => {
	const [loading, setLoading] = React.useState(true);
	const handleCloseOverlay = () => {
		toggle();
		setLoading(true);
	};

	const TacticCardImage = () => (
		<img
			src={`${process.env.PUBLIC_URL}/assets/teamTactics/${card?.image}`}
			alt={card?.name}
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				maxWidth: '90vw',
				maxHeight: '90vh',
				zIndex: 2,
				opacity: loading ? 0.75 : 1,
			}}
			onLoad={() => setLoading(false)}
		/>
	);

	return (
		<Backdrop open={open} onClick={handleCloseOverlay} sx={{ zIndex: 1 }}>
			{loading && <CircularProgress sx={{ zIndex: 3 }} />}
			<TacticCardImage />
		</Backdrop>
	);
};

export default TeamTacticsCardDetail;
