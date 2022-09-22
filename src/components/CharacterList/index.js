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
import AffiliationLogo from '../AffiliationLogo';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme';
import AFFILIATIONS from '../../constants/affiliations.json';

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

	const characterAffiliationLogos = (affiliations) => {
		return affiliations.map((affiliation) => {
			const logo = AFFILIATIONS.find((a) => a.name === affiliation)?.logo;
			return <AffiliationLogo affiliation={logo} key={affiliation.name} />;
		});
	};

	return (
		<List>
			{characters
				.filter((character) => !precluded.includes(character.id))
				.sort((characterA, characterB) => {
					const nameA = characterA.characterName.toUpperCase();
					const nameB = characterB.characterName.toUpperCase();
					return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
				})
				.map((character) => {
					const logos = characterAffiliationLogos(character.affiliations);
					return (
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
									secondary={logos}
								/>
							</ListItem>
							<Divider />
						</div>
					);
				})}
		</List>
	);
};

export default CharacterList;
