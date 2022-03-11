import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';

const RawMaterialsSelectorItem = ({ rawMaterials, ...props }) => {
	const [unit, setUnit] = useState('');

	if (Object.values(rawMaterials).length === 0) return 'Loading...';

	const onChange = (event) => {
		setUnit(rawMaterials[event.target.value].unit);
	};

	return (
		<div>
			<select onChange={onChange} id='cars' name='cars'>
				{Object.values(rawMaterials).map((r) => {
					return (
						<option key={r.id} value={r.id}>
							{r.description}
						</option>
					);
				})}
			</select>
			<input name='amount' autoComplete='off' />
			<label>{unit}</label>
			<button>+</button>
			<button>-</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		rawMaterials: state.rawMaterials,
	};
};

export default connect(mapStateToProps)(RawMaterialsSelectorItem);
