import * as type from '../actions/types';

const otherCostsReducer = (state = {}, action) => {
	switch (action.type) {
		case type.OTHER_COSTS_FETCH:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default otherCostsReducer;
