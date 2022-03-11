import _ from 'lodash';
import * as type from '../actions/types';

const recipiesReducer = (state = {}, action) => {
	switch (action.type) {
		case type.RECIPE_CREATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.RECIPE_FETCH:
			return { ...state, [action.payload.id]: action.payload };
		case type.RECIPE_FETCH_ALL:
			// no entirely sure if ...state is necessary or even desirable
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case type.RECIPE_UPDATE:
			return { ...state, [action.payload.id]: action.payload };
		case type.RECIPE_DELETE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default recipiesReducer;
