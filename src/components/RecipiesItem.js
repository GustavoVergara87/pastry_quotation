import React from 'react';
import { connect } from 'react-redux';
import ItemButtons from './ItemButtons';
import RecipiesItemForm from './RecipiesItemForm';
import { recipeCreateAndUpdate, recipeDelete } from '../actions/recipies';
import './RecipiesItem.css';
import { submit } from 'redux-form';

const RecipiesItem = ({
	setEditingItem,
	editing,
	recipe,
	submit,
	...props
}) => {
	const { id, name, description } = recipe;
	const COLLAPSED = id !== editing.id;
	const NEW = id === '';

	const onClickEdit = () => {
		setEditingItem(recipe);
	};

	const onClickNew = () => {
		setEditingItem(recipe);
	};

	const onClickSubmit = () => {
		console.log('first');
		submit('recipeForm');
	};

	const onSubmit = (formValues) => {
		props.recipeCreateAndUpdate({ ...formValues, id: id });
		setEditingItem({});
	};

	const onClickDel = () => {
		props.recipeDelete(id);
	};

	const onClickCollapse = () => {
		setEditingItem({});
	};

	const renderSummary = () => {
		if (NEW) return '-';
		return (
			<span className='summary'>
				<h3> {`${name}`}</h3>
				<span style={{ color: 'grey' }}>{`${description}`}</span>
			</span>
		);
	};

	return (
		<div>
			<div className='item-header'>
				{renderSummary()}
				<ItemButtons
					NEW={NEW}
					COLLAPSED={COLLAPSED}
					onClickDel={onClickDel}
					onClickCollapse={onClickCollapse}
					onClickNew={onClickNew}
					onClickEdit={onClickEdit}
					onClickSubmit={onClickSubmit}
				/>
			</div>
			<div>
				{!COLLAPSED && (
					<RecipiesItemForm onSubmit={onSubmit} initialValues={recipe} />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	if (ownProps.id === '') {
		return {
			recipe: {
				id: '',
				name: '',
				description: '',
				rawMaterialsList: [],
			},
		};
	}

	return {
		recipe: state.recipies[ownProps.id],
	};
};

export default connect(mapStateToProps, {
	recipeCreateAndUpdate,
	recipeDelete,
	submit,
})(RecipiesItem);
