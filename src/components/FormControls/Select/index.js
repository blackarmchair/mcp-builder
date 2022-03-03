import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormLabel,
	Stack,
	Tooltip,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const StyledSelect = styled(Select)(({ theme }) => ({
	border: '1px solid white',
	color: 'white',
	flexGrow: 1,
}));
const ExampleText = styled(FormLabel)(({ theme }) => ({
	color: theme.palette.text.subtle,
	fontSize: 14,
	marginBottom: theme.spacing(1),
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	backgroundColor: theme.palette.overlay.main,
	color: theme.palette.white.main,
}));

const SelectField = (props) => {
	const {
		label,
		fieldName,
		defaultValue,
		fullWidth,
		helperText,
		exampleText,
		labelType,
		rules,
		options,
	} = props;
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			name={fieldName}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field: { onChange, value } }) =>
				labelType === 'placeholder' ? (
					<Stack direction="row" spacing={1} sx={{ marginBottom: 1 }}>
						<StyledSelect
							fullWidth={fullWidth}
							error={errors.hasOwnProperty(fieldName)}
							helperText={errors[fieldName]?.message}
							value={value}
							onChange={onChange}
							label={label}
							inputProps={{ name: fieldName, id: fieldName }}
							{...props}
						>
							<StyledMenuItem aria-label="None" value=""></StyledMenuItem>
							{options.map((option) => (
								<StyledMenuItem key={option.value} value={option.value}>
									{option.label}
								</StyledMenuItem>
							))}
						</StyledSelect>
						{helperText && (
							<Tooltip title={helperText} placement="right">
								<HelpOutlineIcon />
							</Tooltip>
						)}
					</Stack>
				) : (
					<FormControl
						variant="outlined"
						fullWidth={fullWidth}
						sx={{ marginBottom: 1 }}
					>
						<Stack direction="row" spacing={1}>
							<InputLabel htmlFor={fieldName}>{label}</InputLabel>
							{helperText && (
								<Tooltip title={helperText} placement="right">
									<HelpOutlineIcon />
								</Tooltip>
							)}
						</Stack>
						{exampleText && <ExampleText>{exampleText}</ExampleText>}
						<StyledSelect
							error={errors.hasOwnProperty(fieldName)}
							helperText={errors[fieldName]?.message}
							value={value}
							onChange={onChange}
							label={label}
							inputProps={{ name: fieldName, id: fieldName }}
							{...props}
						>
							<StyledMenuItem aria-label="None" value=""></StyledMenuItem>
							{options.map((option) => (
								<StyledMenuItem key={option.value} value={option.value}>
									{option.label}
								</StyledMenuItem>
							))}
						</StyledSelect>
					</FormControl>
				)
			}
		/>
	);
};

SelectField.defaultProps = {
	defaultValue: '',
	fullWidth: true,
	helperText: '',
	exampleText: '',
	labelType: 'placeholder',
};
SelectField.propTypes = {
	fieldName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		})
	).isRequired,
	fullWidth: PropTypes.bool,
	helperText: PropTypes.string,
	exampleText: PropTypes.string,
	labelType: PropTypes.oneOf(['placeholder', 'standalone']),
	rules: PropTypes.shape({
		required: PropTypes.bool,
		min: PropTypes.number,
		max: PropTypes.number,
		minLength: PropTypes.number,
		maxLength: PropTypes.number,
		pattern: PropTypes.instanceOf(RegExp),
		validate: PropTypes.func,
	}),
};

export default SelectField;
