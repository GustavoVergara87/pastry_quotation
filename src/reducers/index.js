import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import rawMaterialsReducer from './rawMaterials';

export default combineReducers({
	rawMaterials: rawMaterialsReducer,
	form: formReducer,
});
