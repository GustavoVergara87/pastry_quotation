import React, { useEffect } from 'react';
import CollapsibleList from '../CollapsibleList';
import { connect } from 'react-redux';
import { rawFetchAll } from '../../actions/rawMaterials';
import RawMaterialsItem from '../RawMaterialsItem';

function RawMaterials({ rawFetchAll, rawMaterials }) {
	useEffect(() => {
		rawFetchAll();
		// eslint-disable-next-line
	}, []);

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

export default connect(mapStateToProps, { rawFetchAll })(RawMaterials);
