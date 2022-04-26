import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
export default function Header() {
	return (
		<div className='header'>
			<div id='title'>
				<h1>Pastry Quotation</h1>
			</div>
			<ul>
				<li>
					<NavLink
						to='/product'
						className={(isActive) => (isActive ? 'nav-link-current' : '')}
					>
						Product
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/recipies'
						className={(isActive) => (isActive ? 'nav-link-current' : '')}
					>
						Recipies
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/raw'
						className={(isActive) => (isActive ? 'nav-link-current' : '')}
					>
						Raw materials
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/others'
						className={(isActive) => (isActive ? 'nav-link-current' : '')}
					>
						Others costs
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
