import React from 'react';
import { Stack, Typography } from '@mui/material';
import THEME from '../../theme';

const CharacterBio = ({ character, healthy }) => {
	return (
		<Stack
			direction="column"
			spacing={1}
			sx={{
				backgroundColor: THEME.palette.overlay.main,
				p: 2,
				textAlign: 'center',
			}}
		>
			<Typography variant="h5">{character.characterName}</Typography>
			<Typography variant="caption">
				{character.alterEgo} (CP{character.cp}) |{' '}
				{character.affiliations.join(', ')}
			</Typography>
		</Stack>
	);
};

export default CharacterBio;
