import React, { useState } from 'react';

export default function List({ data, Item }) {
	const [editingItem, setEditingItem] = useState({});
	return (
		<div>
			{Object.values(data).length !== 0 &&
				Object.values(data).map((datum) => {
					return (
						<Item
							key={datum.id}
							setEditingItem={setEditingItem}
							editing={editingItem}
							id={datum.id}
						/>
					);
				})}
			{/* Add a blank Id (new item) at the end of the list */}
			{<Item setEditingItem={setEditingItem} editing={editingItem} id={''} />}
		</div>
	);
}
