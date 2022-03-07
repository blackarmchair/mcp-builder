import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Stack,
	Box,
	ToggleButtonGroup,
	ToggleButton,
	Button,
	IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CHARACTERS from '../../constants/characters.json';

import PageContainer from '../../components/PageContainer';
import CharacterBio from '../../components/CharacterBio';
import CharacterVitals from '../../components/CharacterVitals';
import CharacterLeadership from '../../components/CharacterLeadership';
import CharacterAttacks from '../../components/CharacterAttacks';
import CharacterSuperpowers from '../../components/CharacterSuperpowers';
import CharacterImage from '../../components/CharacterImage';

import { useSearch } from '../../contexts/SearchContext';
import { useRouter } from '../../contexts/RouterContext';

const StyledButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	marginTop: theme.spacing(1),
	backgroundColor: theme.palette.overlay.main,
	width: '100%',
	display: 'flex',
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	flexGrow: 1,
}));
const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	flexGrow: 1,
}));
const NavButtonContainer = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	display: 'flex',
	justifyContent: 'center',
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}));
const NavButton = styled(IconButton)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
	'& svg': {
		fontSize: '5vh',
	},
}));

const CardDetail = () => {
	const { characters, handleSetLastAccessedCharacter } = useSearch();
	const { navigate } = useRouter();
	const [side, setSide] = React.useState('healthy');
	const [showImage, setShowImage] = React.useState(false);
	const handleSideChange = (event, newSelection) => {
		if (newSelection !== null) setSide(newSelection);
	};
	let params = useParams();
	const character = CHARACTERS.find((character) => character.id === params.id);

	React.useEffect(() => {
		handleSetLastAccessedCharacter(character.id);
	}, [handleSetLastAccessedCharacter, character.id]);

	if (!character) return <pre>Character data not found.</pre>;

	const powers = [];
	if (Array.isArray(character.activeSuperPowers)) {
		character.activeSuperPowers.forEach((power) => powers.push(power));
	}
	if (Array.isArray(character.reactiveSuperPowers)) {
		character.reactiveSuperPowers.forEach((power) => powers.push(power));
	}
	if (Array.isArray(character.innateSuperpowers)) {
		character.innateSuperpowers.forEach((power) => powers.push(power));
	}

	const handleNextCharacter = () => {
		const currentCharacterIndex = characters.findIndex(
			({ id }) => id === character.id
		);
		const isNextCharacter = Boolean(
			characters.length !== currentCharacterIndex + 1
		);
		if (isNextCharacter) {
			const nextCharacterId = characters[currentCharacterIndex + 1].id;
			navigate(`/card-reference/${nextCharacterId}`);
		}
	};
	const handlePreviousCharacter = () => {
		const currentCharacterIndex = characters.findIndex(
			({ id }) => id === character.id
		);
		const isPrevCharacter = Boolean(currentCharacterIndex !== 0);
		console.log(currentCharacterIndex, isPrevCharacter);
		if (isPrevCharacter) {
			const prevCharacterId = characters[currentCharacterIndex - 1].id;
			navigate(`/card-reference/${prevCharacterId}`);
		}
	};

	return (
		<Stack direction="row" spacing={1} justifyContent="space-between">
			<NavButtonContainer>
				<NavButton
					color="white"
					disableRipple
					onClick={handlePreviousCharacter}
				>
					<ArrowBackIcon />
				</NavButton>
			</NavButtonContainer>
			<PageContainer>
				<Stack direction="column" spacing={2}>
					<CharacterBio
						character={character}
						healthy={!side.localeCompare('healthy')}
					/>

					<Stack direction="row" justifyContent="space-around">
						<StyledButtonGroup
							color="white"
							value={side}
							exclusive
							onChange={handleSideChange}
						>
							<StyledToggleButton key="healthy" value="healthy">
								Healthy Side
							</StyledToggleButton>
							<StyledToggleButton key="injured" value="injured">
								Injured Side
							</StyledToggleButton>
						</StyledButtonGroup>
					</Stack>

					<CharacterVitals
						character={character}
						healthy={!side.localeCompare('healthy')}
					/>

					<StyledButton
						variant="contained"
						onClick={() => setShowImage(true)}
						sx={{ color: 'white' }}
					>
						Show Character Card
					</StyledButton>

					{Array.isArray(character?.leadership) && (
						<CharacterLeadership
							character={character}
							healthy={!side.localeCompare('healthy')}
						/>
					)}
					<CharacterAttacks
						character={character}
						healthy={!side.localeCompare('healthy')}
					/>
					<CharacterSuperpowers
						superpowers={powers}
						healthy={!side.localeCompare('healthy')}
					/>
				</Stack>
			</PageContainer>
			<NavButtonContainer>
				<NavButton color="white" disableRipple onClick={handleNextCharacter}>
					<ArrowForwardIcon />
				</NavButton>
			</NavButtonContainer>
			<CharacterImage
				open={showImage}
				toggle={() => setShowImage(false)}
				character={character}
			/>
		</Stack>
	);
};

export default CardDetail;
