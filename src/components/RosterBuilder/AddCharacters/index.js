import React from 'react';
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useRosters } from '../../../contexts/RosterContext';
import { useSearch } from '../../../contexts/SearchContext';
import CharacterList from '../../CharacterList';
import CharacterAvatar from '../../CharacterAvatar';
import CharacterSearch from '../../CharacterSearch';
import CharacterImage from '../../CharacterImage';
import GemPicker from '../GemPicker';
import toTitleCase from '../../../services/titleCase';
import { isGemBearer, availableGems } from '../../../services/gems';

const Panel = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	marginTop: theme.spacing(1),
	padding: theme.spacing(1),
}));
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));

const ROSTER_CHARACTER_LIMIT = 10;

const AddCharacterModal = ({ open, toggle, addCharacter }) => {
	const { search, reset, characters, currentSearchTerms } = useSearch();
	const { selectedRoster } = useRosters();
	const handleAddCharacter = (character) => {
		addCharacter(character);
		if (
			characters.length === 1 ||
			(currentSearchTerms.length === 1 &&
				currentSearchTerms[0][0] === 'characterName')
		)
			reset();
	};
	return (
		<Dialog open={open} onClose={toggle} maxWidth="md" fullWidth>
			<StyledDialogTitle>
				<Stack direction="row" justifyContent="space-between">
					Add Character
					<IconButton color="white" onClick={toggle}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</StyledDialogTitle>
			<StyledDialogContent>
				<CharacterSearch updateQuery={search} hideNumbers />
				<CharacterList
					clickDisposition="select"
					handleSelection={(character) => handleAddCharacter(character)}
					preclude={selectedRoster.characters}
				/>
			</StyledDialogContent>
		</Dialog>
	);
};

const AddCharacters = () => {
	const { allCharacters } = useSearch();
	const { selectedRoster, updateRoster } = useRosters();
	const [addCharacterModal, setAddCharacterModal] = React.useState(false);
	const [selectedCharacter, setSelectedCharacter] = React.useState();
	const toggleAddCharacterModal = () => {
		setAddCharacterModal((prevState) => !prevState);
	};
	const handleAddCharacter = (character) => {
		updateRoster({
			...selectedRoster,
			characters: [...selectedRoster.characters, character.id],
		});
		toggleAddCharacterModal();
	};
	const handleRemoveCharacter = (e, character) => {
		e.stopPropagation();
		updateRoster({
			...selectedRoster,
			characters: selectedRoster.characters.filter((c) =>
				c.localeCompare(character.id)
			),
		});
	};
	const handleSelectCharacter = (character) => {
		setSelectedCharacter(character);
	};
	const handleDeselectCharacter = () => {
		setSelectedCharacter(null);
	};
	const handleSelectGem = (character, gems) => {
		updateRoster({
			...selectedRoster,
			characters: selectedRoster.characters.map((characterEntry) => {
				const id = Array.isArray(characterEntry)
					? characterEntry[0]
					: characterEntry;
				const match = character.id === id;
				if (match) return [id, gems];
				return characterEntry;
			}),
		});
	};

	return (
		<Panel>
			<List>
				{selectedRoster.characters.map((characterEntry) => {
					const id = Array.isArray(characterEntry)
						? characterEntry[0]
						: characterEntry;
					const character = allCharacters.find((c) => !c.id.localeCompare(id));
					const gems = isGemBearer(character) ? availableGems(character) : [];
					const extraGemThreat = Array.isArray(characterEntry)
						? characterEntry[1].length
						: 0;
					const threat = character.healthySide.healthyThreat + extraGemThreat;
					return (
						<div key={`${character.id}`} style={{ cursor: 'pointer' }}>
							<ListItem
								sx={{
									backgroundColor: 'transparent',
									mb: { xs: 0, md: 1 },
								}}
								onClick={() => handleSelectCharacter(character)}
								secondaryAction={
									<IconButton
										edge="end"
										color="white"
										onClick={(e) => handleRemoveCharacter(e, character)}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								<ListItemAvatar sx={{ mr: 2 }}>
									<CharacterAvatar character={character} />
								</ListItemAvatar>
								<ListItemText
									primary={toTitleCase(character.characterName)}
									secondary={`Threat Level: ${threat}`}
								/>
							</ListItem>
							{gems.length && (
								<GemPicker
									character={character}
									gems={gems}
									defaultSelectedGems={
										Array.isArray(characterEntry) ? characterEntry[1] : []
									}
									handleSelectGem={handleSelectGem}
								/>
							)}
						</div>
					);
				})}
				{Array(ROSTER_CHARACTER_LIMIT - selectedRoster?.characters?.length)
					.fill('')
					.map((slot, idx) => (
						<ListItem
							key={idx}
							onClick={toggleAddCharacterModal}
							secondaryAction={
								<IconButton edge="end" color="white">
									<AddIcon />
								</IconButton>
							}
							sx={{ cursor: 'pointer' }}
						>
							<ListItemText primary="Add Character" />
						</ListItem>
					))}
			</List>
			<AddCharacterModal
				open={addCharacterModal}
				toggle={toggleAddCharacterModal}
				addCharacter={(character) => handleAddCharacter(character)}
			/>
			<CharacterImage
				open={!!selectedCharacter}
				toggle={handleDeselectCharacter}
				character={selectedCharacter}
			/>
		</Panel>
	);
};

export default AddCharacters;
