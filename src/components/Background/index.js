import React from 'react';
import BG1 from '../../assets/bg/bg1.jpg';
import BG4 from '../../assets/bg/bg4.jpg';
import BG5 from '../../assets/bg/bg5.jpg';

const style = {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	zIndex: -1,
	backgroundSize: '50%',
	backgroundRepeat: 'repeat',
	width: '500vw',
	height: '500vh',
	paddingBottom: '40px',
};

const Background = () => {
	const images = [BG1, BG4, BG5];
	const image = images[Math.floor(Math.random() * images.length)];
	return (
		<div
			className="bg"
			style={{
				...style,
				backgroundImage: `linear-gradient(0deg, rgba(56, 65, 67, 0.9), rgba(56, 65, 67, 0.9)), url('${image}')`,
			}}
		></div>
	);
};

export default Background;
