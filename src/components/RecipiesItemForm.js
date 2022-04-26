import React, { useEffect } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './RecipiesItemForm.css';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<>
		<label>{label}</label>
		<input {...input} type={type} autoComplete='off' />
		{touched && error && <span>{error}</span>}
	</>
);

const renderRawMaterialSelector = ({ input, rawMaterialsAvailable }) => (
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
	rawMaterials,
	usedRawMaterials,
}) => {
	const addNewIngredient = () => {
		usedRawMaterials.length < Object.values(rawMaterials).length &&
			fields.push({});
	};

	return (
		<>
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
					<div className='render-raw-materials' key={selectorIndex}>
						<button type='button' onClick={() => fields.remove(selectorIndex)}>
							<span className='material-icons fs-s'>close</span>
						</button>

						<Field
							name={`${rawMaterialSelector}.rawMaterialId`}
							component={renderRawMaterialSelector}
							rawMaterialsAvailable={rawMaterialsAvailable}
						/>

						<Field
							name={`${rawMaterialSelector}.amount`}
							component={renderField}
							label={`${
								rawMaterials[parseInt(usedRawMaterials[selectorIndex])] &&
								rawMaterials[parseInt(usedRawMaterials[selectorIndex])].unit
							}`}
							type='number'
						/>
					</div>
				);
			})}
			<button
				type='button'
				onClick={addNewIngredient}
				className='add-new-ingredient-button'
			>
				<span className='material-icons fs-s fw-br'>add</span>
				add new ingredient
			</button>
		</>
	);
};

const RecipiesItemForm = ({
	initialize,
	initialValues,
	handleSubmit,
	onSubmit,
	rawMaterials,
	usedRawMaterials,
}) => {
	//this fix an issue of redux-form that sometimes doesn't load the initial values
	useEffect(() => {
		initialize(initialValues);
	}, []);

	return (
		<form className='recipies-item-form' onSubmit={handleSubmit(onSubmit)}>
			<div className='container'>
				<div className='inline-field'>
					<Field name='name' component={renderField} label='Recipe Name' />
				</div>
				<div className='inline-field'>
					<Field
						name='description'
						component={renderField}
						label='Description'
					/>
				</div>

				<FieldArray
					name='rawMaterials'
					rawMaterials={rawMaterials}
					usedRawMaterials={usedRawMaterials}
					component={renderRawMaterials}
				/>
			</div>
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

const mapStateToProps = (state) => {
	let usedRawMaterials = [];
	if (
		state.form.recipeForm &&
		state.form.recipeForm.values &&
		state.form.recipeForm.values.rawMaterials
	) {
		usedRawMaterials = state.form.recipeForm.values.rawMaterials.map(
			(rm) => rm.rawMaterialId
		);
	}

	return {
		rawMaterials: state.rawMaterials,
		usedRawMaterials: usedRawMaterials,
	};
};

const recipeForm = reduxForm({
	form: 'recipeForm',
	validate: validate,
})(RecipiesItemForm);

export default connect(mapStateToProps)(recipeForm);
