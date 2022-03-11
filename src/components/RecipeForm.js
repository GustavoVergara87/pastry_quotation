import React from 'react';
import { Field, Form } from 'react-final-form';
import RawMaterialsSelectorItem from './RawMaterialsSelectorItem';
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

function RecipeForm(props) {
	const { id, name, description, rawMaterialsList } = props.recipe;

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

	const renderRawMaterialsList = () => {
		const rm = [0, 1, 2, 3, 4, 5];
		return (
			<div>
				Raw Materials Selector List
				{rm.map((r, i) => {
					return (
						<div key={i}>
							<RawMaterialsSelectorItem />
						</div>
						// <Field
						// 	key={i}
						// 	name='rawMaterial'
						// 	label={i}
						// 	component={renderInput}
						// />
					);
				})}
			</div>
		);
	};

	return (
		<div>
			<Form onSubmit={onSubmit} initialValues={{ description, name }}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Field
							name='name'
							label='Name'
							component={renderInput}
							validate={required}
						/>
						<Field
							name='description'
							label='Description'
							component={renderInput}
							validate={required}
						/>
						{/* Here I have to be able to CRUD Fields... That have Dropdowns that Fetch RawMaterials */}
						{renderRawMaterialsList()}
						<div style={{ display: 'flex', flexFlow: 'row-reverse' }}>
							<button>Save</button>
						</div>
					</form>
				)}
			</Form>
		</div>
	);
}

export default RecipeForm;
