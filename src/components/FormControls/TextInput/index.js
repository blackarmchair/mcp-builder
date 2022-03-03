import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const StyledTextField = styled(TextField)(({ theme }) => ({
  border: "1px solid white",
  color: "white",
  flexGrow: 1,
}));

const ExampleText = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.subtle,
  fontSize: 14,
  marginBottom: theme.spacing(1),
}));

const TextInput = (props) => {
  const {
    fieldName,
    label,
    defaultValue,
    fullWidth,
    helperText,
    exampleText,
    labelType,
    disabled,
    rules,
    type,
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
        labelType === "placeholder" ? (
          <Stack direction="row" spacing={1} mb={2}>
            <StyledTextField
              error={errors.hasOwnProperty(fieldName)}
              helperText={errors[fieldName]?.message}
              label={label}
              variant="outlined"
              value={value}
              onChange={onChange}
              fullWidth={fullWidth}
              disabled={disabled}
              type={type}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            {helperText && (
              <Tooltip title={helperText} placement="right">
                <HelpOutlineIcon />
              </Tooltip>
            )}
          </Stack>
        ) : (
          <FormControl fullWidth={fullWidth}>
            <Stack spacing={1} direction="row">
              {label && <FormLabel>{label}</FormLabel>}
              {helperText && (
                <Tooltip title={helperText} placement="right">
                  <HelpOutlineIcon />
                </Tooltip>
              )}
            </Stack>
            {exampleText && <ExampleText>{exampleText}</ExampleText>}
            <StyledTextField
              error={errors.hasOwnProperty(fieldName)}
              helperText={errors[fieldName]?.message}
              variant="outlined"
              value={value}
              onChange={onChange}
              fullWidth={fullWidth}
              disabled={disabled}
              type={type}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
          </FormControl>
        )
      }
    />
  );
};

TextInput.defaultProps = {
  defaultValue: "",
  fullWidth: true,
  disabled: false,
  helperText: "",
  exampleText: "",
  labelType: "placeholder",
  type: "text",
};
TextInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  exampleText: PropTypes.string,
  labelType: PropTypes.oneOf(["placeholder", "standalone"]),
  type: PropTypes.string,
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

export default TextInput;
