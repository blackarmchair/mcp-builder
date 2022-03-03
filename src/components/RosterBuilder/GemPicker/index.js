import React from "react";
import { Checkbox, Tooltip, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const GemPicker = ({
  character,
  gems,
  handleSelectGem,
  defaultSelectedGems,
}) => {
  const [selectedGems, setSelectedGems] = React.useState(defaultSelectedGems);
  const handleChange = (gem) => {
    setSelectedGems((prevState) => {
      const thanosId = "d2c90764-e434-4951-9334-4a0bfd618c0b";
      const maxLength = character.id === thanosId ? 2 : 1;

      if (prevState.includes(gem.id)) {
        handleSelectGem(
          character,
          prevState.filter((g) => g !== gem.id)
        );
        return prevState.filter((g) => g !== gem.id);
      }

      if (prevState.length >= maxLength) {
        return prevState;
      }

      handleSelectGem(character, [...prevState, gem.id]);
      return [...prevState, gem.id];
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      {gems.map((gem) => (
        <Tooltip title={gem.characterName.split(": ")[1]} key={gem.id}>
          <Checkbox
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CircleIcon />}
            onChange={() => handleChange(gem)}
            checked={selectedGems.includes(gem.id)}
            sx={{
              color: gem.color,
              "&.Mui-checked": { color: gem.color },
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default GemPicker;
