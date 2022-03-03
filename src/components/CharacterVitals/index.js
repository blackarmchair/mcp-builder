import React from "react";
import { Stack, Typography } from "@mui/material";
import MCPIcon from "../McpIcon";
import THEME from "../../theme";

const CharacterVitals = ({ character, healthy }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ backgroundColor: THEME.palette.overlay.main, p: 2 }}
    >
      <Stack direction="row" spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="stamina" size="medium" invert={false} />
          <Typography>
            {healthy
              ? character.healthySide.healthyStamina
              : character.injuredSide.injuredStamina}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="speed" size="medium" invert={false} />
          <Typography>
            {healthy
              ? character.healthySide.healthySpeed
              : character.injuredSide.injuredSpeed}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="size" size="medium" invert={false} />
          <Typography>
            {healthy
              ? character.healthySide.healthySize
              : character.injuredSide.injuredSize}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="threat" size="medium" invert={false} />
          <Typography>
            {healthy
              ? character.healthySide.healthyThreat
              : character.injuredSide.injuredThreat}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="physical" size="medium" />
          <Typography>
            {healthy
              ? character.healthySide.healthyPhysicalDefense
              : character.injuredSide.injuredPhysicalDefense}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="energy" size="medium" />
          <Typography>
            {healthy
              ? character.healthySide.healthyEnergyDefense
              : character.injuredSide.injuredEnergyDefense}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <MCPIcon icon="mystic" size="medium" />
          <Typography>
            {healthy
              ? character.healthySide.healthyMysticalDefense
              : character.injuredSide.injuredMysticalDefense}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CharacterVitals;
