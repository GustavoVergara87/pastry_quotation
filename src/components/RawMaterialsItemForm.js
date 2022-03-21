import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const renderInput = ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label> {label}</label>
			<input {...input} autoComplete='off' />
			{error && touched && <span>{error}</span>}
		</div>
	);
};

const RawMaterialsForm = (props) => {
	//this fix an issue of redux-form that sometimes doesn't load the initial values
	useEffect(() => {
		props.initialize(props.initialValues);
	}, []);

	return (
		<div>
			<form onSubmit={props.handleSubmit(props.onSubmit)}>
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
					<button type='submit'>Save</button>
				</div>
			</form>
			<hr />
		</div>
	);
};

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

export default reduxForm({
	form: 'rawMaterials',
})(RawMaterialsForm);
