const facings = [
	{
		label: 'Skull',
		successOnDefense: false,
		successOnOffense: false,
		rerollable: false,
		generatesExtraDice: false,
	},
	{
		label: 'Blank',
		successOnDefense: false,
		successOnOffense: false,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Blank',
		successOnDefense: false,
		successOnOffense: false,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Shield',
		successOnDefense: true,
		successOnOffense: false,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Hit',
		successOnDefense: false,
		successOnOffense: true,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Hit',
		successOnDefense: false,
		successOnOffense: true,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Wild',
		successOnDefense: true,
		successOnOffense: true,
		rerollable: true,
		generatesExtraDice: false,
	},
	{
		label: 'Critical',
		successOnDefense: true,
		successOnOffense: true,
		rerollable: true,
		generatesExtraDice: true,
	},
];

const probabilityOfOneHit = () =>
	facings.reduce(
		(acc, facing) => (facing.successOnOffense ? acc + 1 : acc),
		0
	) / facings.length;
const probabilityOfOneDefense = () =>
	facings.reduce((acc, facing) => (facing.successOnDefense ? acc + 1 : acc)) /
	facings.length;

const d = (sides) => Math.floor(Math.random() * sides + 1);
const factorialize = (number) => {
	if (number < 0) return -1;
	if (number === 0) return 1;
	return number * factorialize(number - 1);
};
const binomialCoefficient = (observations, successes) => {
	return (
		(factorialize(observations) / factorialize(successes)) *
		factorialize(observations - successes)
	);
};

export const rollDice = (numDice, numSides = 8) => {
	const results = [];
	for (let index = 0; index < numDice; index++) {
		const result = d(numSides);
		results.push({ ...facings[result - 1], value: result });
	}
	return results;
};
export const chanceOfExactlyNHits = (numDice, numSuccesses) => {
	const p = probabilityOfOneHit();
	const f = 1 - p;
	return p ** numSuccesses * f ** (numDice - numSuccesses);
};
export const chanceOfAtLeastNHits = (numDice, numSuccesses) => {
	const p = probabilityOfOneHit();
	return (
		binomialCoefficient(numDice, numSuccesses) *
		p ** numSuccesses *
		(1 - p) ** (numDice - numSuccesses)
	);
};
export const chanceOfExactlyNDefenses = (numDice, numSuccesses) => {
	const p = probabilityOfOneDefense();
	const f = 1 - p;
	return p ** numSuccesses * f ** (numDice - numSuccesses);
};
export const chanceOfAtLeastNDefenses = (numDice, numSuccesses) => {
	const p = probabilityOfOneDefense();
	return (
		binomialCoefficient(numDice, numSuccesses) *
		p ** numSuccesses *
		(1 - p) ** (numDice - numSuccesses)
	);
};
export const chanceOfWildTrigger = (numDice, numSuccesses) => {
	const p = 1 / 8;
	return (
		((1 - p) * numDice - numSuccesses) *
		(p * numSuccesses) *
		((factorialize(numDice) / factorialize(numDice - numSuccesses)) *
			factorialize(numSuccesses)) *
		100
	);
};
