import React from 'react';

const CharacterAvatar = ({ character, highlight }) => {
	const portrait = `${process.env.PUBLIC_URL}/assets/portraits/${character.portrait}`;
	const style = {
		backgroundImage: `url(${portrait})`,
		backgroundPositionX: 0,
		backgroundPositionY: 0,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '50px',
		width: '50px',
		borderRadius: '50%',
		border: highlight ? `2px solid gold` : undefined,
	};
	return <div style={style}></div>;
};

export default CharacterAvatar;
