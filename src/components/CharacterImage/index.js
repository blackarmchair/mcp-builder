import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const CharacterImage = ({ open, toggle, character }) => {
	const [loading, setLoading] = React.useState(true);
	const [face, setFace] = React.useState(0);
	const toggleFacing = (e) => {
		e.stopPropagation();
		if (character?.cards[0] !== character?.cards[1]) {
			setLoading(true);
			setFace((prevState) => {
				if (prevState) return 0;
				return 1;
			});
		}
	};
	const handleCloseOverlay = () => {
		toggle();
		setFace(0);
		setLoading(true);
	};

	return (
		<Backdrop open={open} onClick={handleCloseOverlay} sx={{ zIndex: 1 }}>
			{loading && <CircularProgress sx={{ zIndex: 3 }} />}
			<img
				src={`${process.env.PUBLIC_URL}/assets/${character?.cards[face]}`}
				alt={character?.characterName}
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
				onClick={(e) => toggleFacing(e)}
				onLoad={() => setLoading(false)}
			/>
		</Backdrop>
	);
};

export default CharacterImage;
