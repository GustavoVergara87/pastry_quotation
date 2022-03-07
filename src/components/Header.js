import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<div>
			<h1>Pastry Quotation</h1>
			<ul>
				<Link to='/product'>Product</Link>
				<Link to='/recipies'>Recipies</Link>
				<Link to='/raw'>Raw materials</Link>
				<Link to='/others'>Others costs</Link>
			</ul>
		</div>
	);
}
