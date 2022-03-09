import React from 'react';
import { Stack, Typography, Paper } from '@mui/material';
import MCPIcon from '../McpIcon';
import parseRulesText from '../../services/parseSpecialRules';
import toTitleCase from '../../services/titleCase';
import THEME from '../../theme.js';

const CharacterAttacks = ({ character, healthy }) => {
	return (
		<Stack direction="column" spacing={2}>
			{character.attacks
				.filter((attack) => {
					if (healthy && attack.injuredOnly) return false;
					if (!healthy && attack.healthyOnly) return false;
					return true;
				})
				.map((attack) => {
					const rulesText = parseRulesText(attack.specialRules);
					return (
						<Paper
							elevation={2}
							key={attack.name}
							sx={{ backgroundColor: THEME.palette.overlay.main, p: 1 }}
						>
							<Stack
								direction="row"
								spacing={1}
								justifyContent="space-between"
								sx={{
									backgroundColor:
										THEME.palette[attack.type.toLowerCase()].main,
									p: 1,
									mb: rulesText.length ? 1 : 0,
									color: THEME.palette[attack.type.toLowerCase()].contrastColor,
								}}
							>
								<Typography>{toTitleCase(attack.name)}</Typography>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="center"
									alignItems="center"
								>
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
									>
										<MCPIcon icon="range" size="small" />
										<Typography>{attack.range}</Typography>
									</Stack>
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
									>
										<MCPIcon icon="strength" size="small" />
										<Typography>{attack.strength}</Typography>
									</Stack>
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
									>
										<MCPIcon icon="power" size="small" />
										<Typography>{attack.cost}</Typography>
									</Stack>
								</Stack>
							</Stack>
							{!!rulesText.length && (
								<Stack direction="column" spacing={1} sx={{ px: 2, py: 1 }}>
									{rulesText}
								</Stack>
							)}
						</Paper>
					);
				})}
		</Stack>
	);
};

export default CharacterAttacks;
