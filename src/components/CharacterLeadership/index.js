import React from "react";
import { Stack, Typography, Paper } from "@mui/material";
import MCPIcon from "../McpIcon";
import parseRulesText from "../../services/parseSpecialRules";
import toTitleCase from "../../services/titleCase";
import THEME from "../../theme";

const CharacterLeadership = ({ character, healthy }) => {
  return (
    <Stack direction="column" spacing={2}>
      {character.leadership
        .filter((leadership) => {
          if (healthy && leadership.injuredOnly) return false;
          if (!healthy && leadership.healthyOnly) return false;
          return true;
        })
        .map((leadership) => (
          <Paper
            elevation={2}
            key={leadership.name}
            sx={{ backgroundColor: THEME.palette.overlay.main, p: 1 }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              sx={{
                mb: 1,
                backgroundColor: THEME.palette.overlay.headerBg,
                p: 1,
              }}
            >
              <Stack direction="row" spacing={1}>
                <MCPIcon icon="leadership" size="medium" />
                <Typography>{toTitleCase(leadership.name)}</Typography>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1} sx={{ px: 2, pb: 2 }}>
              {parseRulesText(leadership.specialRules)}
            </Stack>
          </Paper>
        ))}
    </Stack>
  );
};

export default CharacterLeadership;
