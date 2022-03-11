import React, { useEffect } from 'react';
import CollapsibleList from '../CollapsibleList';
import { connect } from 'react-redux';
import { recipeFetchAll } from '../../actions/recipies';
import RecipiesItem from '../RecipiesItem';

const Recipies = ({ recipies, recipeFetchAll }) => {
	useEffect(() => {
		recipeFetchAll();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ height: '50vh', overflowY: 'scroll' }}>
			<CollapsibleList data={recipies} Item={RecipiesItem} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		recipies: state.recipies,
	};
};

export default connect(mapStateToProps, { recipeFetchAll })(Recipies);
