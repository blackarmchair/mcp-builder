import React from 'react';

const AffiliationLogo = ({ affiliation }) => {
	const src = `${process.env.PUBLIC_URL}/assets/affiliations/${affiliation}`;
	const style = {
		display: 'inline-block',
		marginRight: 8,
		backgroundImage: `url(${src})`,
		backgroundPositionX: 0,
		backgroundPositionY: 0,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '25px',
		width: '25px',
		borderRadius: '50%',
		filter: 'grayscale(1)',
	};
	return <div style={style}></div>;
};

export default AffiliationLogo;
