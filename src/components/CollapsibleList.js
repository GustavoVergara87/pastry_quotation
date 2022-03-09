import React, { useState } from 'react';

export default function List({ data, Item }) {
	const [editingItem, setEditingItem] = useState({});

	return (
		<div>
			{Object.values(data).map((datum) => {
				return (
					<Item
						key={datum.id}
						onEdit={setEditingItem}
						editing={editingItem}
						id={datum.id}
					/>
				);
			})}
			{<Item onEdit={setEditingItem} editing={editingItem} id={''} />}
		</div>
	);
}
