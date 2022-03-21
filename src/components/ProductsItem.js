import React from 'react';
import ItemButtons from './ItemButtons';
import { connect } from 'react-redux';
import {
	productCreateAndUpdate,
	productDelete,
} from '../actions/products';
import ProductsItemForm from './ProductsItemForm';

const ProductsItem = ({
	setEditingItem,
	editing,
	product,
	id,
	...props
}) => {
	const { name } = product;
	const COLLAPSED = id !== editing.id;
	const NEW = id === '';

	const onClickEdit = () => {
		setEditingItem(product);
	};

	const onClickNew = () => {
		setEditingItem(product);
	};

	const onSubmit = (formValues) => {
		props.productCreateAndUpdate({ ...formValues, id: id });
		setEditingItem({});
	};

	const onClickDel = () => {
		props.productDelete(id);
	};

	const onClickCollapse = () => {
		setEditingItem({});
	};

	const price = () => {
		if (Object.values(props.rawMaterials).length === 0 || !product) return 0;

		const rawMaterialsPrice = (product.recipiesAndRawMaterialsArray || [])
			.filter(
				(r) => JSON.parse(r.recipiesAndRawMaterials).type === 'rawMaterial'
			)
			.map((p) => {
				return {
					rawMaterialPricePerUnit:
						parseFloat(
							props.rawMaterials[JSON.parse(p.recipiesAndRawMaterials).id].price
						) /
						parseFloat(
							props.rawMaterials[JSON.parse(p.recipiesAndRawMaterials).id].amount
						),
					productAmount: p.amount,
				};
			})
			.map((rm) => rm.rawMaterialPricePerUnit * rm.productAmount)
			.reduce((total, rawMatPrice) => {
				return total + rawMatPrice;
			}, 0);

		const recipiesPrice = (product.recipiesAndRawMaterialsArray || [])
			.filter((r) => JSON.parse(r.recipiesAndRawMaterials).type === 'recipe')
			.map((p) =>
				props.recipies[JSON.parse(p.recipiesAndRawMaterials).id].rawMaterials
					.map((rm) => {
						return {
							rawMaterialPricePerUnit:
								parseFloat(props.rawMaterials[parseInt(rm.rawMaterialId)].price) /
								parseFloat(props.rawMaterials[parseInt(rm.rawMaterialId)].amount),
							recipieAmount: rm.amount,
						};
					})
					.map((rm) => rm.rawMaterialPricePerUnit * rm.recipieAmount * p.amount)
					.reduce((total, recipePriceTimesProductAmount) => {
						return total + recipePriceTimesProductAmount;
					}, 0)
			)
			.reduce((total, recipe) => {
				return total + recipe;
			}, 0);

		const hs =
			parseFloat(product.laborHsToPrepareIt.split(':')[0]) +
			parseFloat(product.laborHsToPrepareIt.split(':')[1] / 60);

		return Math.round(
			recipiesPrice +
				rawMaterialsPrice +
				props.otherCosts.labor * hs +
				(props.otherCosts.fixedCost / (8 * 5 * 4)) * hs
		);
	};

	const renderSumary = () => {
		if (NEW) return '-';
		return (
			<span>
				<h3 style={{ display: 'inline', marginRight: '2em' }}>{`${name}`}</h3>
				<span style={{ color: 'grey' }}>{`$${price()}`}</span>
			</span>
		);
	};

	const renderForm = () => {
		if (COLLAPSED) return null;
		return (
			<ProductsItemForm
				onSubmit={onSubmit}
				product={product}
				initialValues={product}
			/>
		);
	};

	return (
		<div>
			{renderSumary()}
			<ItemButtons
				NEW={NEW}
				COLLAPSED={COLLAPSED}
				onClickDel={onClickDel}
				onClickCollapse={onClickCollapse}
				onClickNew={onClickNew}
				onClickEdit={onClickEdit}
			/>
			{renderForm()}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	if (ownProps.id === '') {
		return {
			product: {
				id: '',
				name: '',
				description: '',
				hsToPrepareIt: '',
			},
		};
	}

	return {
		product: state.products[ownProps.id],
		rawMaterials: state.rawMaterials,
		recipies: state.recipies,
		otherCosts: state.otherCosts,
	};
};

export default connect(mapStateToProps, {
	productCreateAndUpdate,
	productDelete,
})(ProductsItem);
