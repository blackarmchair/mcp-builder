import CHARACTERS from '../constants/characters.json';
import TEAM_TACTICS from '../constants/teamTactics.json';
import CRISES from '../constants/crises.json';
import { copyTextToClipboard } from './copy';
import toTitleCase from './titleCase';

const formatRoster = (roster) => {
	const characters = roster.characters
		.map((entry) => {
			return Array.isArray(entry)
				? CHARACTERS.find((c) => c.id === entry[0])
				: CHARACTERS.find((c) => c.id === entry);
		})
		.map(
			(character) =>
				`\t${toTitleCase(character.characterName)} (${
					character.healthySide.healthyThreat
				})\n`
		);

	const teamTactics = roster.teamTactics
		.map((tacticId) => TEAM_TACTICS.find((t) => t.id === tacticId))
		.map((tactic) => `\t${toTitleCase(tactic.name)}\n`);

	const crises = roster.crises
		.map((crisisId) => CRISES.find((c) => c.id === crisisId))
		.map((crisis) => `\t${toTitleCase(crisis.name)} (${crisis.threat})\n`);

	copyTextToClipboard(
		`${roster.name}\n\nCharacters:\n${characters.join(
			''
		)}\n\nTeam Tactics Cards:\n${teamTactics.join(
			''
		)}\n\nCrises:\n${crises.join('')}`
	);
};

export default formatRoster;
