import React from 'react';
import { Field, Form } from 'react-final-form';

const required = (value) => (value ? undefined : 'Required');

const mustBeNumber = (value) =>
	isNaN(value) ? 'Must be a number' : undefined;

const composeValidators =
	(...validators) =>
	(value) =>
		validators.reduce(
			(error, validator) => error || validator(value),
			undefined
		);

function RawMaterialsForm(props) {
	const { id, description, price, amount, unit } = props.rawMaterial;

	const onSubmit = (formValues) => {
		props.onSubmit({ ...formValues, id: id });
	};

	const renderInput = ({ input, label, meta }) => {
		return (
			<div>
				<label> {label}</label>
				<input {...input} autoComplete='off' />
				{meta.error && meta.touched && <span>{meta.error}</span>}
			</div>
		);
	};

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				initialValues={{ description, price, amount, unit }}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Field
							name='description'
							label='Description'
							component={renderInput}
							validate={required}
						/>
						<Field
							name='price'
							label='Price'
							component={renderInput}
							validate={composeValidators(required, mustBeNumber)}
						/>
						<Field
							name='amount'
							label='Amount'
							component={renderInput}
							validate={composeValidators(required, mustBeNumber)}
						/>
						<Field
							name='unit'
							label='Unit'
							component={renderInput}
							validate={required}
						/>

						<div style={{ display: 'flex', flexFlow: 'row-reverse' }}>
							<button>Save</button>
						</div>
					</form>
				)}
			</Form>
		</div>
	);
}

export default RawMaterialsForm;
