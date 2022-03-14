import React, { useEffect } from 'react';
import RecipiesList from '../CollapsibleList';
import { connect } from 'react-redux';
import { recipeFetchAll } from '../../actions/recipies';
import { rawFetchAll } from '../../actions/rawMaterials';
import RecipiesItem from '../RecipiesItem';

const Recipies = ({ recipies, ...props }) => {
	useEffect(() => {
		props.recipeFetchAll();
		props.rawFetchAll();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ height: '50vh', overflowY: 'scroll' }}>
			<RecipiesList data={recipies} Item={RecipiesItem} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		recipies: state.recipies,
	};
};

export default connect(mapStateToProps, { rawFetchAll, recipeFetchAll })(
	Recipies
);
