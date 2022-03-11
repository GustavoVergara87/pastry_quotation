import * as type from './types';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;
const collection = 'recipe';

export const recipeCreateAndUpdate = (formValues) => {
	switch (formValues.id) {
		case '':
			formValues.id = Date.now();
			db.collection(collection).add(formValues);
			return { type: type.RECIPE_CREATE, payload: formValues };
		default:
			db.collection(collection).doc({ id: formValues.id }).set(formValues);
			return { type: type.RECIPE_UPDATE, payload: formValues };
	}
};

export const recipeFetch = (id) => {
	return { type: type.RECIPE_FETCH, payload: 'recipe fetched data' };
};

export const recipeFetchAll = () => async (dispatch) => {
	const response = await db.collection(collection).get();
	dispatch({ type: type.RECIPE_FETCH_ALL, payload: response });
};

export const recipeDelete = (id) => async (dispatch) => {
	await db.collection(collection).doc({ id: id }).delete();
	dispatch({ type: type.RECIPE_DELETE, payload: id });
};
