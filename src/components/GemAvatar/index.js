import React from 'react';

const GemAvatar = ({ gem }) => {
	const style = {
		backgroundImage: `url(${gem.cards[0]})`,
		backgroundPositionX: 0,
		backgroundPositionY: 0,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '50px',
		width: '50px',
		borderRadius: '50%',
	};
	return <div style={style}></div>;
};

export default GemAvatar;
