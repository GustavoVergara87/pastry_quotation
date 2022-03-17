import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import rawMaterialsReducer from './rawMaterials';
import recipiesReducer from './recipies';
import otherCostsReducer from './otherCosts';
import productsReducer from './products';

export default combineReducers({
	form: formReducer,
	rawMaterials: rawMaterialsReducer,
	recipies: recipiesReducer,
	otherCosts: otherCostsReducer,
	products: productsReducer,
});
