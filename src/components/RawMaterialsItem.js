import React from 'react';
import { connect } from 'react-redux';
import ItemButtons from './ItemButtons';
import RawMaterialsItemForm from './RawMaterialsItemForm';
import { rawCreateAndUpdate, rawDelete } from '../actions/rawMaterials';

const RawMaterialsItem = ({
	setEditingItem,
	editing,
	rawMaterial,
	...props
}) => {
	const { id, description, price, amount, unit } = rawMaterial;
	const COLLAPSED = id !== editing.id;
	const NEW = id === '';

	const onClickEdit = () => {
		setEditingItem(rawMaterial);
	};

	const onClickNew = () => {
		setEditingItem(rawMaterial);
	};

	const onSubmit = (formValues) => {
		props.rawCreateAndUpdate({ ...formValues, id: id });
		setEditingItem({});
	};

	const onClickDel = () => {
		props.rawDelete(id);
	};

	const onClickCollapse = () => {
		setEditingItem({});
	};

	const renderSummary = () => {
		if (NEW) return '-';
		return (
			<span>
				<h3
					style={{ display: 'inline', marginRight: '2em' }}
				>{`${description}`}</h3>
				<span style={{ color: 'grey' }}>
					{`$${price} / ${amount} ${unit}`}
				</span>
			</span>
		);
	};

	const renderForm = () => {
		if (COLLAPSED) return null;
		return (
			<RawMaterialsItemForm onSubmit={onSubmit} initialValues={rawMaterial} />
		);
	};

	return (
		<div>
			<div style={{ position: 'relative', padding: 1 }}>
				{renderSummary()}
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
	if (ownProps.id === '')
		return {
			rawMaterial: {
				id: '',
				description: '',
				price: '',
				amount: '',
				unit: '',
			},
		};
	return {
		rawMaterial: state.rawMaterials[ownProps.id],
	};
};

export default connect(mapStateToProps, { rawCreateAndUpdate, rawDelete })(
	RawMaterialsItem
);
