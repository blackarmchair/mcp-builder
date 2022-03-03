import GEMS from "../constants/gems.json";

export const isGemBearer = (character) => {
  try {
    return (
      character.innateSuperpowers.findIndex((power) =>
        power.name.toLowerCase().includes("gem bearer")
      ) > -1
    );
  } catch (err) {
    return false;
  }
};

export const availableGems = (character) => {
  try {
    const power = character.innateSuperpowers.find((power) =>
      power.name.toLowerCase().includes("gem bearer")
    );
    if (!!power) {
      const gems = power.name
        .split("[")[1]
        .split("]")[0]
        .toLowerCase()
        .split(", ");
      return gems.map((gem) =>
        GEMS.find((g) => g.characterName.toLowerCase().includes(gem))
      );
    }
    return [];
  } catch (err) {
    return [];
  }
};
