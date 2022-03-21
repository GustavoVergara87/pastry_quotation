import React, { useEffect } from 'react';
import ProductsCollapsibleList from '../CollapsibleList';
import ProductsItem from '../ProductsItem';
import { connect } from 'react-redux';
import { productsFetchAll } from '../../actions/products';
import { rawFetchAll } from '../../actions/rawMaterials';
import { recipeFetchAll } from '../../actions/recipies';
import { otherCostsFetch } from '../../actions/otherCosts';

const Products = ({ products, ...props }) => {
	useEffect(() => {
		props.productsFetchAll();
		props.rawFetchAll();
		props.recipeFetchAll();
		props.otherCostsFetch();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<h2>Products</h2>
			<div style={{ height: '50vh', overflowY: 'scroll' }}>
				<ProductsCollapsibleList data={products} Item={ProductsItem} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

export default connect(mapStateToProps, {
	productsFetchAll,
	rawFetchAll,
	recipeFetchAll,
	otherCostsFetch,
})(Products);
