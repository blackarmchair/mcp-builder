function matches(a, b, fuzzy = true) {
	const fuzzySearch = typeof a === 'string' && typeof b === 'string' && fuzzy;
	if (fuzzySearch) {
		return a.toLowerCase().includes(b.toLowerCase());
	}
	return a === b;
}

export function findInObject(collection, property, value, fuzzy = true) {
	if (Array.isArray(collection)) {
		for (const obj of collection) {
			const result = findInObject(obj, property, value);
			if (result) return obj;
		}
	} else {
		if (
			(collection.hasOwnProperty(property) &&
				matches(collection[property], value, fuzzy)) ||
			collection === value
		) {
			return collection;
		}

		for (const k of Object.keys(collection)) {
			if (typeof collection[k] === 'object') {
				const o = findInObject(collection[k], property, value);
				if (o !== null && typeof o !== 'undefined') return o;
			}
		}

		return null;
	}
}
