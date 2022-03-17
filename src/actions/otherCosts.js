import * as types from './types';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;
const collection = 'otherCosts';

export const otherCostsFetch = () => async (dispatch) => {
	const response = await db
		.collection(collection)
		.doc({ id: 'main' })
		.get();
	dispatch({ type: types.OTHER_COSTS_FETCH, payload: response });
};

export const otherCostsUpdate = (formValues) => async (dispatch) => {
	const previousValues = await db
		.collection(collection)
		.doc({ id: 'main' })
		.get();

	if (!previousValues) {
		await db.collection(collection).add({ id: 'main' });
	}

	const response = await db
		.collection(collection)
		.doc({ id: 'main' })
		.set({ ...formValues, id: 'main' });
	dispatch({ type: types.OTHER_COSTS_UPDATE, payload: response });
};
