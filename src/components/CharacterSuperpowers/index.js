import React from 'react';
import { Stack, Typography, Paper } from '@mui/material';
import MCPIcon from '../McpIcon';
import parseRulesText from '../../services/parseSpecialRules';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme';

const CharacterSuperpowers = ({ superpowers, healthy }) => {
	return (
		<Stack direction="column" spacing={2}>
			{superpowers
				.filter((power) => {
					if (healthy && power.injuredOnly) return false;
					if (!healthy && power.healthyOnly) return false;
					return true;
				})
				.map((power) => (
					<Paper
						elevation={2}
						key={power.name}
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
								<MCPIcon icon={power.type} size="medium" />
								<Typography>{toTitleCase(power.name)}</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Stack direction="row" alignItems="center">
									<MCPIcon icon="power" size="small" />
									<Typography>{power.cost}</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Stack direction="column" spacing={1} sx={{ px: 2, py: 1 }}>
							{parseRulesText(power.specialRules)}
						</Stack>
					</Paper>
				))}
		</Stack>
	);
};

export default CharacterSuperpowers;
