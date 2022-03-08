import React, { useState } from 'react';
import Item from './Item';
export default function List() {
	const items = [
		{
			id: 1,
			description: 'Flour',
			price: 200,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 2,
			description: 'Eggs',
			price: 250,
			unit: 'unit',
			amount: 30,
		},
		{
			id: 3,
			description: 'Apples',
			price: 100,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 4,
			description: 'Sugar',
			price: 70,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 5,
			description: 'Decorative Box',
			price: 120,
			unit: 'unit',
			amount: 1,
		},
	];

	const [uncollapsedItem, setUncollapsedItem] = useState({});

	return (
		<div>
			{items.map((item) => {
				return (
					<Item
						key={item.id}
						data={item}
						onUncollapse={setUncollapsedItem}
						uncollapsed={uncollapsedItem}
					/>
				);
			})}
			{
				<Item
					data={{}}
					onUncollapse={setUncollapsedItem}
					uncollapsed={uncollapsedItem}
				/>
			}
		</div>
	);
}
