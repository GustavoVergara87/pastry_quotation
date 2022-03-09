import React from 'react';

function RawMaterialsForm(props) {
	const { description, price, amount, unit } = props.rawMaterial;
	return (
		<div>
			<form>
				<div>
					<label> Descripcion</label>
					<input defaultValue={description}></input>
				</div>
				<div>
					<label> Price</label>
					<input defaultValue={price}></input>
				</div>
				<div>
					<label> Amount</label>
					<input defaultValue={amount}></input>
				</div>
				<div>
					<label> Unit</label>
					<input defaultValue={unit}></input>
				</div>
			</form>
		</div>
	);
}

export default RawMaterialsForm;
