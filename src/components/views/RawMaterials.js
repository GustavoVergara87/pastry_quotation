import React, { useEffect } from 'react';
import CollapsibleList from '../CollapsibleList';
import { connect } from 'react-redux';
import { rawReadAll } from '../../actions/rawMaterials';
import RawMaterialsItem from '../RawMaterialsItem';

function RawMaterials({ rawReadAll, rawMaterials }) {
	useEffect(() => {
		rawReadAll();
		// eslint-disable-next-line
	}, []);

	if (Object.values(rawMaterials).length === 0) return null;

	return (
		<div style={{ height: '50vh', overflowY: 'scroll' }}>
			<CollapsibleList data={rawMaterials} Item={RawMaterialsItem} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		rawMaterials: state.rawMaterials,
	};
};

export default connect(mapStateToProps, { rawReadAll })(RawMaterials);
