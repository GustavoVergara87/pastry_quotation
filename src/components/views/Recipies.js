import React, { useEffect } from 'react';
import RecipiesCollapsibleList from '../CollapsibleList';
import { connect } from 'react-redux';
import { recipeFetchAll } from '../../actions/recipies';
import { rawFetchAll } from '../../actions/rawMaterials';
import RecipiesItem from '../RecipiesItem';
import './Views.css';
const Recipies = ({ recipies, ...props }) => {
	useEffect(() => {
		props.recipeFetchAll();
		props.rawFetchAll();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='section-container'>
			{/* <h2>Recipies</h2> */}
			{/* <div style={{ height: '50vh', overflowY: 'scroll' }}> */}
			<div>
				<RecipiesCollapsibleList data={recipies} Item={RecipiesItem} />
			</div>
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
