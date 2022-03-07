import React, { useState } from 'react';
import RawMaterialsForm from './RawMaterialsForm';

export default function Item({ data, uncollapsed, onUncollapse }) {
	const COLLAPSED = 0,
		EDIT = 1,
		NEW_EDIT = 2,
		NEW_COLLAPSED = 3;

	const [state, setState] = useState(COLLAPSED);

	const onClickEdit = () => {
		console.log('Show edit form');
		setState(EDIT);
		onUncollapse(data);
	};

	const onClickDel = () => {
		console.log('Dispatch action Delete');
	};

	const onClickSave = () => {
		console.log('Dispatch action Save');
		setState(COLLAPSED);
	};

	const onClickNew = () => {
		console.log('Show edit new form');
		setState(NEW_EDIT);
	};

	const onClickCollapse = () => {
		switch (state) {
			case NEW_EDIT:
				setState(NEW_COLLAPSED);
				break;
			case EDIT:
				setState(COLLAPSED);
				break;
			default:
				return;
		}
	};

	const renderForm = () => {
		if (uncollapsed.id === data.id) {
			return state === EDIT || state === NEW_EDIT ? (
				<RawMaterialsForm />
			) : null;
		} else {
			onClickCollapse();
		}
	};

	return (
		<div
			style={{ borderBottom: '1px solid lightgrey', position: 'relative' }}
		>
			<span style={{ color: 'grey' }}>
				{`${data.description}`}
				{` id:${data.id}`}
				{` price:${data.price}`}
				{` unit:${data.unit}`}
				{` amount:${data.amount}`}
			</span>
			<span style={{ position: 'absolute', right: '0' }}>
				{state === EDIT || state === COLLAPSED ? (
					<button onClick={onClickDel}>Del</button>
				) : null}
				{state === EDIT || state === NEW_EDIT ? (
					<button onClick={onClickSave}>Save</button>
				) : null}
				{state === NEW_COLLAPSED ? (
					<button onClick={onClickNew}>New</button>
				) : null}
				{state === EDIT || state === NEW_EDIT ? (
					<button onClick={onClickCollapse}>X</button>
				) : null}
				{state === COLLAPSED ? (
					<button onClick={onClickEdit}>Edit</button>
				) : null}
			</span>
			{renderForm()}
		</div>
	);
}
