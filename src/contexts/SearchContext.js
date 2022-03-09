import React, { createContext, useContext, useState } from 'react';
import CHARACTERS from '../constants/characters.json';
import TEAM_TACTICS from '../constants/teamTactics.json';
import CRISES from '../constants/crises.json';
import { findInObject } from '../services/findInObject';

const SearchContext = createContext();

export function useSearch() {
	return useContext(SearchContext);
}

export function SearchProvider({ children }) {
	const [characters, setCharacters] = useState(CHARACTERS);
	const [teamTactics, setTeamTactics] = useState(TEAM_TACTICS);
	const [crises, setCrises] = useState(CRISES);
	const [isFiltered, setIsFiltered] = useState(false);
	const [currentSearchTerms, setCurrentTerms] = useState([]);
	const [lastAccessedCharacter, setLastAccessedCharacter] = useState(
		CHARACTERS[0].id
	);

	const reset = () => {
		setCharacters(CHARACTERS);
		setTeamTactics(TEAM_TACTICS);
		setCrises(CRISES);
		setIsFiltered(false);
		setCurrentTerms([]);
	};

	/**
	 *
	 * @param {Array} terms in the form ['property', 'value']
	 * @param {String} category
	 */
	const search = (terms, category, fuzzy = true) => {
		// Separate-out any full-text search terms as they are handled differently
		const fullTextSearchTerms = [];
		const regularSearchTerms = [];
		terms.forEach((term) => {
			if (term[0] === 'fullText') fullTextSearchTerms.push(term);
			else regularSearchTerms.push(term);
		});

		// Combine previously-applied search terms with any new ones
		const merged = [...regularSearchTerms];
		currentSearchTerms.forEach((term) => {
			const isOverwritten = terms.find((t) => !t[0].localeCompare(term[0]));
			if (!isOverwritten) merged.push(term);
		});
		setCurrentTerms(merged);

		// Determine which collection to search in
		const defaultSet = !category.localeCompare('teamTactics')
			? TEAM_TACTICS
			: !category.localeCompare('crises')
			? CRISES
			: CHARACTERS;

		const results = defaultSet
			// Filter the list with the updated set of terms
			.filter((member) =>
				merged.every((term) => findInObject(member, term[0], term[1], fuzzy))
			)
			// Filter the list with any full-text search terms
			.filter((member) => {
				if (fullTextSearchTerms.length)
					return JSON.stringify(member)
						.toLowerCase()
						.includes(fullTextSearchTerms[0][1].toLowerCase());
				return member;
			});

		// If, after applying search terms, the filtered list is the same as the
		// default list reset the search
		if (results.length === defaultSet.length) reset();
		else {
			setIsFiltered(true);

			// Push the filtered list into state
			if (!category.localeCompare('characters')) setCharacters(results);
			if (!category.localeCompare('teamTactics')) setTeamTactics(results);
			if (!category.localeCompare('crises')) setCrises(results);
		}
	};

	/**
	 * This tracks the last character the user viewed in the details page.
	 * This is used to scroll to the last spot when the back button is used.
	 */
	const handleSetLastAccessedCharacter = (characterId) => {
		setLastAccessedCharacter(characterId);
	};
	const resetLastAccessedCharacter = () => {
		setLastAccessedCharacter(CHARACTERS[0].id);
	};

	return (
		<SearchContext.Provider
			value={{
				currentSearchTerms,
				search,
				characters,
				teamTactics,
				crises,
				lastAccessedCharacter,
				handleSetLastAccessedCharacter,
				resetLastAccessedCharacter,
				reset,
				isFiltered,
				allCharacters: CHARACTERS,
				allTeamTactics: TEAM_TACTICS,
				allCrises: CRISES,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}
