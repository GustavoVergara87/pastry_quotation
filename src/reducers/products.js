import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import * as type from '../actions/types';

const productsReducer = (state = {}, action) => {
	switch (action.type) {
		case type.PRODUCTS_CREATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.PRODUCTS_FETCH:
			return { ...state, [action.payload.id]: action.payload };
		case type.PRODUCTS_FETCH_ALL:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case type.PRODUCTS_UPDATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.PRODUCTS_DELETE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default productsReducer;
