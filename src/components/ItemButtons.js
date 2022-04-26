import React from 'react';
import './ItemButtons.css';
const ItemButtons = ({
	NEW,
	COLLAPSED,
	onClickDel,
	onClickCollapse,
	onClickNew,
	onClickEdit,
	onClickSubmit,
}) => {
	return (
		<span className='item-buttons-container'>
			{!NEW && (
				<button className='btn' onClick={onClickDel}>
					<span className='material-icons'>delete</span>
				</button>
			)}
			{!COLLAPSED && (
				<button className='btn' onClick={onClickCollapse}>
					<span className='material-icons'>close</span>
				</button>
			)}
			{COLLAPSED && NEW && (
				<button className='btn' onClick={onClickNew}>
					<span className='material-icons'>add</span>
				</button>
			)}
			{COLLAPSED && !NEW && (
				<button className='btn' onClick={onClickEdit}>
					<span className='material-icons'>edit</span>
				</button>
			)}

			{!COLLAPSED && (
				<button className='btn' onClick={onClickSubmit}>
					<span className='material-icons'>check</span>
				</button>
			)}
		</span>
	);
};

export default ItemButtons;
