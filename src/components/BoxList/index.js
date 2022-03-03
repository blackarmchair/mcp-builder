import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Checkbox,
	Stack,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Local from '../../services/local';

const StyledListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	marginBottom: theme.spacing(1),
}));
const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
	color: theme.palette.white.main,
}));
const StyledButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	marginTop: theme.spacing(1),
	[theme.breakpoints.down('sm')]: {
		marginBottom: theme.spacing(1),
	},
	backgroundColor: theme.palette.overlay.main,
	width: '100%',
	display: 'flex',
	flex: '0 1 auto',
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
	flexGrow: 1,
}));

const CATEGORIES = {
	ALL: 'all',
	OWNED: 'owned',
	NOT_OWNED: 'notOwned',
};

const BoxList = ({ cps }) => {
	const currentCollection = Local.read('collection');
	if (currentCollection === null) {
		Local.set('collection', []);
	}
	const [collection, setCollection] = React.useState(currentCollection);
	const [selectedCategory, setSelectedCategory] = React.useState(
		CATEGORIES.ALL
	);
	const handleSelect = (e) => {
		setSelectedCategory(e.target.value);
	};

	const handleChecked = (box) => {
		const updatedCollection = [...collection, box[0].cp];
		Local.set('collection', updatedCollection);
		setCollection(updatedCollection);
	};

	const handleUnchecked = (box) => {
		const updatedCollection = collection.filter((cp) => cp !== box[0].cp);
		Local.set('collection', updatedCollection);
		setCollection(updatedCollection);
	};

	const handleChange = (box) => {
		const isInCollection = collection?.find((cp) => box[0].cp === cp);
		if (isInCollection) handleUnchecked(box);
		else handleChecked(box);
	};

	return (
		<Stack direction="column" spacing={1}>
			<Stack direction="row" justifyContent="space-around">
				<StyledButtonGroup
					color="white"
					value={selectedCategory}
					exclusive
					onChange={handleSelect}
				>
					<StyledToggleButton value={CATEGORIES.ALL}>
						Show All
					</StyledToggleButton>
					<StyledToggleButton value={CATEGORIES.OWNED}>
						Owned
					</StyledToggleButton>
					<StyledToggleButton value={CATEGORIES.NOT_OWNED}>
						Not Owned
					</StyledToggleButton>
				</StyledButtonGroup>
			</Stack>
			<List>
				{cps
					.filter((box) => {
						const owned = collection?.indexOf(box[0].cp) > -1;
						if (!selectedCategory.localeCompare(CATEGORIES.OWNED)) return owned;
						if (!selectedCategory.localeCompare(CATEGORIES.NOT_OWNED))
							return !owned;
						return true;
					})
					.map((box) => (
						<StyledListItem
							key={box[0].cp}
							onClick={() => handleChange(box)}
							secondaryAction={
								<StyledCheckbox
									edge="end"
									checked={collection?.indexOf(box[0].cp) > -1}
									color="white"
								/>
							}
							sx={{ cursor: 'pointer' }}
						>
							<ListItemText
								primary={`CP: ${box[0].cp}`}
								secondary={box
									.map((character) => character.characterName)
									.join(', ')}
							/>
						</StyledListItem>
					))}
			</List>
		</Stack>
	);
};

export default BoxList;
