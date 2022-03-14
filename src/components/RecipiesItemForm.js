import React, { useEffect } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<span>
		<label>{label}</label>
		<input {...input} type={type} autoComplete='off' />
		{touched && error && <span>{error}</span>}
	</span>
);

const renderRawMaterialSelector = ({
	input,
	meta: { touched, error },
	rawMaterialsAvailable,
}) => (
	<select {...input}>
		{Object.values(rawMaterialsAvailable).map((r) => {
			return (
				<option key={r.id} value={r.id}>
					{r.description}
				</option>
			);
		})}
	</select>
);

const renderRawMaterials = ({
	fields,
	meta: { error, submitFailed },
	rawMaterials,
	usedRawMaterials,
}) => (
	<ul>
		<li>
			<button
				type='button'
				onClick={() => {
					usedRawMaterials.length < Object.values(rawMaterials).length &&
						fields.push({});
				}}
			>
				+
			</button>
			{submitFailed && error && <span>{error}</span>}
		</li>

		{fields.map((rawMaterialSelector, selectorIndex) => {
			const rawMaterialsAvailable = Object.values(rawMaterials).filter(
				(r) => {
					for (let i = 0; i < usedRawMaterials.length; i++) {
						if (selectorIndex !== i && usedRawMaterials[i] === r.id.toString())
							return false;
					}
					return true;
				}
			);

			if (rawMaterialsAvailable.length === 0) return null;

			return (
				<div key={selectorIndex}>
					<button type='button' onClick={() => fields.remove(selectorIndex)}>
						-
					</button>

					<Field
						name={`${rawMaterialSelector}.rawMaterialId`}
						component={renderRawMaterialSelector}
						rawMaterialsAvailable={rawMaterialsAvailable}
					/>
					<Field
						name={`${rawMaterialSelector}.amount`}
						component={renderField}
						label='Amount'
						type='number'
					/>
				</div>
			);
		})}
	</ul>
);

const RecipiesItemForm = (props) => {
	//this fix an issue of redux-form that sometimes doesn't load the initial values
	useEffect(() => {
		props.initialize(props.initialValues);
	}, []);

	return (
		<form onSubmit={props.handleSubmit(props.onSubmit)}>
			<div>
				<Field name='name' component={renderField} label='Recipe Name' />
			</div>
			<Field name='description' component={renderField} label='Description' />
			<FieldArray
				name='rawMaterials'
				rawMaterials={props.rawMaterials}
				usedRawMaterials={props.usedRawMaterials}
				component={renderRawMaterials}
			/>
			<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<button type='submit'>Submit</button>
			</div>
			<hr />
		</form>
	);
};
//-------------------------------------------------------------------------

const validate = ({ name, description }) => {
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

	const errors = {};

	//errors.name = composeValidators(required, mustBeNumber)(name);

	errors.name = required(name);

	errors.description = required(description);

	return errors;
};

const recipeForm = reduxForm({
	form: 'recipeForm',
	validate: validate,
})(RecipiesItemForm);

const mapStateToProps = (state) => {
	let usedRawMaterials = [];

	if (state.form.recipeForm) {
		if (state.form.recipeForm.values) {
			if (state.form.recipeForm.values.rawMaterials) {
				usedRawMaterials = state.form.recipeForm.values.rawMaterials.map(
					(rm) => {
						return rm.rawMaterialId;
					}
				);
			}
		}
	}

	return {
		rawMaterials: state.rawMaterials,
		usedRawMaterials: usedRawMaterials,
	};
};

export default connect(mapStateToProps)(recipeForm);
