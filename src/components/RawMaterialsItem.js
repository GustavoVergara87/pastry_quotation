import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	rawCreateAndUpdate,
	rawRead,
	rawDelete,
} from '../actions/rawMaterials';
import RawMaterialsForm from './RawMaterialsForm';

function RawMaterialsItem({ onEdit, editing, rawMaterial, ...props }) {
	const { id, description, price, amount, unit } = rawMaterial;
	const COLLAPSED = id !== editing.id;

	const onClickEdit = () => {
		onEdit(rawMaterial);
	};

	const onClickNew = () => {
		onEdit(rawMaterial);
	};

	const onSubmit = (formValues) => {
		props.rawCreateAndUpdate(formValues);
		onEdit({});
	};

	const onClickDel = () => {
		console.log('Dispatch action Delete');
	};

	const onClickCollapse = () => {
		onEdit({});
	};

	const renderSumary = () => {
		if (id === '') return '-';
		return (
			<span style={{ color: 'grey' }}>
				<h3
					style={{ display: 'inline', marginRight: '2em' }}
				>{`${description}`}</h3>
				{`$${price} / ${amount} ${unit}`}
			</span>
		);
	};

	const renderButtons = () => {
		return (
			<span style={{ position: 'absolute', right: '0' }}>
				{id !== '' && <button onClick={onClickDel}>Del</button>}
				{!COLLAPSED && <button onClick={onClickCollapse}>X</button>}
				{COLLAPSED && id === '' && <button onClick={onClickNew}>New</button>}
				{COLLAPSED && id !== '' && <button onClick={onClickEdit}>Edit</button>}
			</span>
		);
	};

	const renderForm = () => {
		if (!COLLAPSED) {
			return (
				<RawMaterialsForm onSubmit={onSubmit} rawMaterial={rawMaterial} />
			);
		}
	};

	return (
		<div>
			<div style={{ position: 'relative', padding: 1 }}>
				{renderSumary()}
				{renderButtons()}
			</div>
			<div>{renderForm()}</div>
		</div>
	);
}

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

export default connect(mapStateToProps, { rawCreateAndUpdate })(
	RawMaterialsItem
);
