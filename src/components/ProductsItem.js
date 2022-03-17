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
		return '0';
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
				recipies: [],
				rawMaterials: [],
				hsToPrepareIt: '',
			},
		};
	}

	return {
		product: state.products[ownProps.id],
	};
};

export default connect(mapStateToProps, {
	productCreateAndUpdate,
	productDelete,
})(ProductsItem);
