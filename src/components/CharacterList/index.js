import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Divider,
} from '@mui/material';
import { useSearch } from '../../contexts/SearchContext';
import { useRouter } from '../../contexts/RouterContext';
import CharacterAvatar from '../CharacterAvatar';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme';

const CharacterList = ({ clickDisposition, handleSelection, preclude }) => {
	const { characters, lastAccessedCharacter, handleSetLastAccessedCharacter } =
		useSearch();
	const { navigate } = useRouter();

	React.useEffect(() => {
		document
			.getElementById(lastAccessedCharacter)
			?.scrollIntoView({ block: 'end' });
	}, [lastAccessedCharacter]);

	const precluded = Array.isArray(preclude) ? preclude : [];
	const handleSelect = (character) => {
		if (clickDisposition === 'select') handleSelection(character);
		else {
			handleSetLastAccessedCharacter(character.id);
			navigate(`/card-reference/${character.id}`);
		}
	};

	return (
		<List>
			{characters
				.filter((character) => !precluded.includes(character.id))
				.map((character) => (
					<div
						key={`${character.id}`}
						onClick={() => handleSelect(character)}
						style={{ cursor: 'pointer' }}
					>
						<ListItem
							sx={{
								backgroundColor: THEME.palette.overlay.main,
								mb: 1,
							}}
							id={character.id}
						>
							<ListItemAvatar sx={{ mr: 2 }}>
								<CharacterAvatar character={character} />
							</ListItemAvatar>
							<ListItemText
								primary={toTitleCase(character.characterName)}
								secondary={toTitleCase(character.alterEgo)}
							/>
						</ListItem>
						<Divider />
					</div>
				))}
		</List>
	);
};

export default CharacterList;
