import { combineReducers } from 'redux';
import rawMaterialsReducer from './rawMaterials';

export default combineReducers({
	rawMaterials: rawMaterialsReducer,
});
