import _ from 'lodash';
import * as type from '../actions/types';

const rawMaterialsReducer = (state = {}, action) => {
	switch (action.type) {
		case type.RAW_CREATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.RAW_READ:
			return { ...state, [action.payload.id]: action.payload };
		case type.RAW_READ_ALL:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case type.RAW_UPDATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.RAW_DELETE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default rawMaterialsReducer;
