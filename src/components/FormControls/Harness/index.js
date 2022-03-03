import React from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';

const FormHarness = (props) => {
	const { handleFormSubmit, defaultValues, children } = props;
	const ComponentForm = useForm();

	return (
		<FormProvider {...ComponentForm}>
			<form onSubmit={ComponentForm.handleSubmit(handleFormSubmit)}>
				{React.Children.map(children, (child) => {
					const { fieldName } = child.props;
					const defaultValue =
						!!fieldName && !!defaultValues
							? defaultValues[fieldName]
							: undefined;
					return React.cloneElement(child, { ...child.props, defaultValue });
				})}
			</form>
		</FormProvider>
	);
};

FormHarness.propTypes = {
	handleFormSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
};

export default FormHarness;
