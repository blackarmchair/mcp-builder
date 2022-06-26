import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const GemDetail = ({ open, toggle, gem }) => {
	const [loading, setLoading] = React.useState(true);
	const handleCloseOverlay = () => {
		toggle();
		setLoading(true);
	};

	return (
		<Backdrop open={open} onClick={handleCloseOverlay} sx={{ zIndex: 1 }}>
			{loading && <CircularProgress sx={{ zIndex: 3 }} />}
			<img
				src={gem?.cards[0]}
				alt={gem?.characterName}
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					maxWidth: '90vw',
					maxHeight: '90vh',
					zIndex: 2,
					opacity: loading ? 0 : 1,
				}}
				onLoad={() => setLoading(false)}
			/>
		</Backdrop>
	);
};

export default GemDetail;
