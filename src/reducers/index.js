import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import rawMaterialsReducer from './rawMaterials';
import recipiesReducer from './recipies';

export default combineReducers({
	form: formReducer,
	rawMaterials: rawMaterialsReducer,
	recipies: recipiesReducer,
});
