import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FormHarness from '../FormControls/Harness';
import TextInput from '../FormControls/TextInput';
import SelectInput from '../FormControls/Select';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	padding: theme.spacing(1),
}));

const Field = ({ name, label, type, cmpt, options }) => {
	if (!!cmpt && !cmpt.localeCompare('Select'))
		return (
			<SelectInput
				fieldName={name}
				label={label}
				options={options}
				fullWidth
				labelType="standalone"
			/>
		);
	return (
		<TextInput fieldName={name} label={label} fullWidth type={type || 'text'} />
	);
};

const AdvancedSearchModal = ({ open, toggle, submit, searchFields }) => {
	return (
		<Dialog open={open} onClose={toggle} maxWidth="md" fullWidth>
			<FormHarness handleFormSubmit={submit}>
				<StyledDialogTitle>Advanced Search</StyledDialogTitle>
				<StyledDialogContent>
					<Grid container spacing={1}>
						{searchFields.map((field) => (
							<Grid item xs={12} md={6} key={field.name}>
								<Field {...field} />
							</Grid>
						))}
					</Grid>
				</StyledDialogContent>
				<StyledDialogActions>
					<Button variant="contained" color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button variant="contained" color="primary" type="submit">
						Search
					</Button>
				</StyledDialogActions>
			</FormHarness>
		</Dialog>
	);
};

export default AdvancedSearchModal;
