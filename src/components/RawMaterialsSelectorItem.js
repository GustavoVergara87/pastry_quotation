import React, { useEffect } from 'react';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';
import { rawFetchAll } from '../actions/rawMaterials';

const RawMaterialsSelectorItem = ({ rawMaterials, ...props }) => {
	useEffect(() => {
		props.rawFetchAll();
	}, []);

	if (Object.values(rawMaterials).length === 0) return 'Loading...';

	return (
		<div>
			<select id='cars' name='cars'>
				{Object.values(rawMaterials).map((r) => {
					return (
						<option key={r.id} value={r.id}>
							{r.description}
						</option>
					);
				})}
			</select>
			<input name='amount' autoComplete='off' />
			<label>Kg</label>
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

export default connect(mapStateToProps, { rawFetchAll })(
	RawMaterialsSelectorItem
);
