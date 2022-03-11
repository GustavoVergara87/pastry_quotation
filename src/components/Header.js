import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<div>
			<h1>Pastry Quotation</h1>
			<ul>
				<li>
					<Link to='/product'>Product</Link>
				</li>
				<li>
					<Link to='/recipies'>Recipies</Link>
				</li>
				<li>
					<Link to='/raw'>Raw materials</Link>
				</li>
				<li>
					<Link to='/others'>Others costs</Link>
				</li>
			</ul>
		</div>
	);
}
