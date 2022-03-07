import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Products from './views/Products';
import RawMaterials from './views/RawMaterials';
import Recipies from './views/Recipies';
import OtherCosts from './views/OtherCosts';

import Header from './Header';
export default function App() {
	return (
		<div>
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path='/product' exact component={Products} />
						<Route path='/recipies' exact component={Recipies} />
						<Route path='/raw' exact component={RawMaterials} />
						<Route path='/others' exact component={OtherCosts} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}
