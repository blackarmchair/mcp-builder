import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useRosters } from '../../contexts/RosterContext';
import { useToast } from '../../contexts/ToastContext';

function isGuid(id) {
	const pattern =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return pattern.test(id);
}

function isValidValue(value, spec) {
	if (spec === 'string') return typeof value === 'string';
	if (spec === 'guid') return value.every((entry) => isGuid(entry));
	if (spec === 'number') {
		const d = new Date(value);
		return typeof d.getTime() === 'number';
	}
	return false;
}

function isValidRoster(roster) {
	// Roster must be an object
	if (typeof roster !== 'object') return false;

	// Roster must have all required properties & valid entries for each prop
	const requiredProperties = [
		['name', 'string'],
		['characters', 'guid'],
		['teamTactics', 'guid'],
		['crises', 'guid'],
		['created', 'number'],
		['lastUpdated', 'number'],
	];
	const hasRequiredProperties = requiredProperties.every((prop) => {
		return (
			roster.hasOwnProperty(prop[0]) && isValidValue(roster[prop[0]], prop[1])
		);
	});
	if (!hasRequiredProperties) return false;

	return true;
}

function getRosterFromBlob(blob) {
	try {
		const removeQuotes = blob.replace(/['"]+/g, '');
		const decoded = JSON.parse(atob(removeQuotes));

		if (isValidRoster(decoded))
			return {
				...decoded,
				id: crypto.randomUUID(),
			};
		return null;
	} catch (e) {
		return null;
	}
}

const Import = () => {
	const { rosterBlob } = useParams();
	const { importRoster } = useRosters();
	const { postMessage } = useToast();
	const importedRoster = getRosterFromBlob(rosterBlob);

	React.useEffect(() => {
		if (importedRoster !== null) {
			importRoster(importedRoster);
		} else {
			postMessage('Import Failed...', 'error');
		}
	}, [importRoster, importedRoster, postMessage]);

	return <Redirect to={`/rosters/${importedRoster.id}`} />;
};

export default Import;
