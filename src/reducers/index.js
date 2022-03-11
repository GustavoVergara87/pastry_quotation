import { combineReducers } from 'redux';
import rawMaterialsReducer from './rawMaterials';
import recipiesReducer from './recipies';

export default combineReducers({
	rawMaterials: rawMaterialsReducer,
	recipies: recipiesReducer,
});
