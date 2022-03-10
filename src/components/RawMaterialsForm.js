import React from 'react';
import { Field, Form } from 'react-final-form';

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
						/>
						<Field name='price' label='Price' component={renderInput} />
						<Field name='amount' label='Amount' component={renderInput} />
						<Field name='unit' label='Unit' component={renderInput} />

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
