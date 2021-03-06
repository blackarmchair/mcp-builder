import CHARACTERS from "../constants/characters.json";

const allPossibleCases = (arr) => {
  const combine = (sub, ind) => {
    let result = [];
    let i, l, p;
    for (i = ind, l = arr.length; i < l; i++) {
      p = sub.slice(0);
      p.push(arr[i]);
      result = result.concat(combine(p, i + 1));
      result.push(p);
    }
    return result;
  };
  return combine([], 0);
};

export const getRosterData = (roster) => {
  // Get all characters
  const characters = roster.characters
    .map((entry) => {
      const character = Array.isArray(entry)
        ? CHARACTERS.find((c) => c.id === entry[0])
        : CHARACTERS.find((c) => c.id === entry);
      return character;
    })
    .filter((character) => character !== undefined)
    .map((character) => {
      const hasGems = roster.characters.find(
        (c) => Array.isArray(c) && c[0] === character.id
      );

      if (!hasGems) return character;
      return {
        ...character,
        healthySide: {
          ...character.healthySide,
          healthyThreat:
            character.healthySide.healthyThreat + hasGems[1].length,
        },
        injuredSide: {
          ...character.injuredSide,
          healthyThreat:
            character.injuredSide.injuredThreat + hasGems[1].length,
        },
      };
    });

  // Get all potential leaders
  const leaders = characters.filter(
    (character) =>
      (character.hasOwnProperty("leadership") && character.leadership.length) ||
      character.affiliations.includes("Convocation")
  );

  // Get all potential affiliations
  const affiliations = leaders.reduce((list, character) => {
    return [...new Set([...list, ...character.affiliations])];
  }, []);

  // Get all potential roster combinations
  const possibleRosters = allPossibleCases(characters)
    .map((candidate) => ({
      leaders: [],
      affiliations: [],
      totalThreat: 0,
      characters: candidate,
    }))

    // Total threat is in-bounds
    .filter((candidate) => {
      const totalThreat = candidate.characters.reduce(
        (threat, character) => threat + character.healthySide.healthyThreat,
        0
      );
      return totalThreat >= 14 && totalThreat <= 20;
    })
    .map((candidate) => ({
      ...candidate,
      totalThreat: candidate.characters.reduce(
        (threat, character) => threat + character.healthySide.healthyThreat,
        0
      ),
    }))

    // Contains at least one leader
    .filter((candidate) => {
      return candidate.characters.filter(
        (character) =>
          (character.hasOwnProperty("leadership") &&
            character.leadership.length) ||
          character.affiliations.includes("Convocation")
      ).length;
    })
    .map((candidate) => ({
      ...candidate,
      leaders: candidate.characters.filter(
        (character) =>
          (character.hasOwnProperty("leadership") &&
            character.leadership.length) ||
          character.affiliations.includes("Convocation")
      ),
    }))

    // Has more than half of all characters sharing an affiliation/leader
    .map((candidate) => ({
      ...candidate,
      affiliations: candidate.leaders
        .filter((leader) => {
          const affiliationLead = leader.hasOwnProperty("leadership")
            ? leader?.leadership[0]?.affiliation
            : "Convocation";
          const followers = candidate.characters.reduce((count, char) => {
            const canBeLead = char.affiliations
              .map((a) => a.toLowerCase())
              .includes(affiliationLead.toLowerCase());
            return canBeLead ? count + 1 : count;
          }, 0);

          return followers >= Math.ceil(candidate.characters.length / 2);
        })
        .reduce((list, leader) => {
          const affiliation = leader.hasOwnProperty("leadership")
            ? leader?.leadership[0]?.affiliation
            : "Convocation";
          return [...new Set([...list, affiliation])];
        }, []),
    }));

  return {
    characters,
    leaders,
    affiliations,
    possibleRosters,
  };
};
