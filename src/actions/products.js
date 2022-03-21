import { dblClick } from '@testing-library/user-event/dist/click';
import * as type from './types';
import Localbase from 'localbase';

const db = new Localbase('db');
db.config.debug = false;
const collection = 'products';

export const productsFetchAll = () => async (dispatch) => {
	const response = await db.collection(collection).get();
	dispatch({ type: type.PRODUCTS_FETCH_ALL, payload: response });
};

export const productCreateAndUpdate = (formValues) => async (dispatch) => {
	switch (formValues.id) {
		case '':
			formValues.id = Date.now();
			await db.collection(collection).add(formValues);
			dispatch({ type: type.PRODUCTS_CREATE, payload: formValues });
			break;
		default:
			await db
				.collection(collection)
				.doc({ id: formValues.id })
				.set(formValues);
			dispatch({ type: type.PRODUCTS_UPDATE, payload: formValues });
			break;
	}
};

export const productDelete = (id) => async (dispatch) => {
	await db.collection(collection).doc({ id: id }).delete();
	dispatch({ type: type.PRODUCTS_DELETE, payload: id });
};
