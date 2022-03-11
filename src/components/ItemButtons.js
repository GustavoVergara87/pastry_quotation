import React from 'react';

const ItemButtons = ({
	NEW,
	COLLAPSED,
	onClickDel,
	onClickCollapse,
	onClickNew,
	onClickEdit,
}) => {
	return (
		<span style={{ position: 'absolute', right: '0' }}>
			{!NEW && <button onClick={onClickDel}>Del</button>}
			{!COLLAPSED && <button onClick={onClickCollapse}>X</button>}
			{COLLAPSED && NEW && <button onClick={onClickNew}>New</button>}
			{COLLAPSED && !NEW && <button onClick={onClickEdit}>Edit</button>}
		</span>
	);
};

export default ItemButtons;
