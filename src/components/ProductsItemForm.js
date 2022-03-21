import React, { useEffect } from 'react';
import {
	FieldArray,
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import FileInput from './FileInput';

const renderField = ({ input, type, label }) => (
	<span>
		<label>{label}</label>
		<input {...input} type={type} />
	</span>
);

const renderRRselector = ({
	input,
	rawMaterialsAvailable,
	recipiesAvailable,
}) => {
	return (
		<select {...input}>
			<option value={null}></option>

			<optgroup label='Recipies'>
				{Object.values(recipiesAvailable).map((r, index) => {
					return (
						<option
							key={index}
							value={JSON.stringify({ type: 'recipe', id: r.id })}
						>
							{r.name}
						</option>
					);
				})}
			</optgroup>

			<optgroup label='Raw Materials'>
				{Object.values(rawMaterialsAvailable).map((r, index) => {
					return (
						<option
							key={index}
							value={JSON.stringify({ type: 'rawMaterial', id: r.id })}
						>
							{r.description}
						</option>
					);
				})}
			</optgroup>
		</select>
	);
};

const renderRecipiesAndRawMaterials = ({
	fields,
	rawMaterials,
	recipies,
	usedRecipiesAndRawMaterials,
}) => {
	return (
		<div>
			<button
				type='button'
				onClick={() => {
					fields.push({});
				}}
			>
				+
			</button>

			{fields.map((RRselector, selectorIndex) => {
				const rawMaterialsAvailable = Object.values(rawMaterials).filter(
					(r) => {
						for (let i = 0; i < usedRecipiesAndRawMaterials.length; i++) {
							if (
								selectorIndex !== i &&
								usedRecipiesAndRawMaterials[i].id === r.id &&
								usedRecipiesAndRawMaterials[i].type === 'rawMaterial'
							)
								return false;
						}
						return true;
					}
				);

				const recipiesAvailable = Object.values(recipies).filter((r) => {
					for (let i = 0; i < usedRecipiesAndRawMaterials.length; i++) {
						if (
							selectorIndex !== i &&
							usedRecipiesAndRawMaterials[i].id === r.id &&
							usedRecipiesAndRawMaterials[i].type === 'recipe'
						)
							return false;
					}
					return true;
				});

				return (
					<div key={selectorIndex}>
						<Field
							name={`${RRselector}.recipiesAndRawMaterials`}
							component={renderRRselector}
							rawMaterialsAvailable={rawMaterialsAvailable}
							recipiesAvailable={recipiesAvailable}
						/>
						<Field
							name={`${RRselector}.amount`}
							component={renderField}
							label={`${
								(usedRecipiesAndRawMaterials[selectorIndex] &&
									rawMaterials[
										parseInt(usedRecipiesAndRawMaterials[selectorIndex].id)
									] &&
									rawMaterials[
										parseInt(usedRecipiesAndRawMaterials[selectorIndex].id)
									].unit) ||
								'unit'
							}`}
						/>
						<button type='button' onClick={() => fields.remove(selectorIndex)}>
							-
						</button>
					</div>
				);
			})}
		</div>
	);
};

const ProductsItemForm = (props) => {
	//this fix an issue of redux-form that sometimes doesn't load the initial values
	useEffect(() => {
		props.initialize(props.initialValues);
	}, []);
	// props.change(
	// 	`recipiesAndRawMaterialsArray.2.recipiesAndRawMaterials`,
	// 	'{"type":"rawMaterial","id":1646933607861}'
	// );
	return (
		<div>
			<form onSubmit={props.handleSubmit(props.onSubmit)}>
				<Field name='name' component={renderField} label='Name' />
				<Field
					name='laborHsToPrepareIt'
					component={renderField}
					type='time'
					label='Labor hours'
				/>
				<div>Recipies & Raw Materials</div>
				<FieldArray
					name='recipiesAndRawMaterialsArray'
					component={renderRecipiesAndRawMaterials}
					rawMaterials={props.rawMaterials}
					recipies={props.recipies}
					usedRecipiesAndRawMaterials={props.usedRecipiesAndRawMaterials}
				/>

				<img alt='Product' src={props.product_image} width='100px' />
				<Field component={FileInput} name='product_image' type='file' />
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
};

const productForm = reduxForm({
	form: 'productForm',
})(ProductsItemForm);

const selector = formValueSelector('productForm');

const mapStateToProps = (state) => {
	let usedRecipiesAndRawMaterials = selector(
		state,
		'recipiesAndRawMaterialsArray'
	);

	let product_image = selector(state, 'product_image');

	if (usedRecipiesAndRawMaterials) {
		usedRecipiesAndRawMaterials = usedRecipiesAndRawMaterials
			.filter((r) => r.recipiesAndRawMaterials)
			.map((r) => JSON.parse(r.recipiesAndRawMaterials));
	}

	usedRecipiesAndRawMaterials = usedRecipiesAndRawMaterials || [];

	return {
		rawMaterials: state.rawMaterials,
		recipies: state.recipies,
		usedRecipiesAndRawMaterials: usedRecipiesAndRawMaterials,
		product_image: product_image,
	};
};

export default connect(mapStateToProps)(productForm);
