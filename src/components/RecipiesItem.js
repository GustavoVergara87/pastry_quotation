import React from 'react';
import { connect } from 'react-redux';
import ItemButtons from './ItemButtons';
import RecipeForm from './RecipeForm';

const RecipiesItem = ({ setEditingItem, editing, recipe, ...props }) => {
	const { id, name, description, rawMaterials } = recipe;
	const COLLAPSED = id !== editing.id;
	const NEW = id === '';

	const onClickEdit = () => {
		setEditingItem(recipe);
	};

	const onClickNew = () => {
		setEditingItem(recipe);
	};

	const onSubmit = (formValues) => {
		props.recipeCreateAndUpdate(formValues);
		setEditingItem({});
	};

	const onClickDel = () => {
		props.recipeDelete(id);
	};

	const onClickCollapse = () => {
		setEditingItem({});
	};

	const renderSumary = () => {
		if (NEW) return '-';
		return (
			<span style={{ color: 'grey' }}>
				<h3 style={{ display: 'inline', marginRight: '2em' }}>{`${name}`}</h3>
				{`${description}`}
			</span>
		);
	};

	const renderForm = () => {
		if (COLLAPSED) return null;
		return <RecipeForm recipe={recipe} />;
	};

	return (
		<div>
			<div style={{ position: 'relative', padding: 1 }}>
				{renderSumary()}
				<ItemButtons
					NEW={NEW}
					COLLAPSED={COLLAPSED}
					onClickDel={onClickDel}
					onClickCollapse={onClickCollapse}
					onClickNew={onClickNew}
					onClickEdit={onClickEdit}
				/>
			</div>
			<div>{renderForm()}</div>
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
				rawMaterials: [],
			},
		};
	}
	return {
		recipe: state.recipies[ownProps.id],
	};
};

export default connect(mapStateToProps)(RecipiesItem);
