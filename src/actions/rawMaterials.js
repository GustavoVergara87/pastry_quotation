import * as type from './types';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;
const collection = 'rawMaterials';

export const rawCreateAndUpdate = (formValues) => async (dispatch) => {
	//Blank id => new value
	//Otherwise => update
	switch (formValues.id) {
		case '':
			// create a simple id auto increment
			formValues.id = Date.now();
			// post new rawMaterial
			await db.collection(collection).add(formValues);
			// dispatch the action loading that raw into redux
			dispatch({ type: type.RAW_CREATE, payload: formValues });

		default:
			// put the changes for the raw with an specific id
			await db
				.collection(collection)
				.doc({ id: formValues.id })
				.set(formValues);
			// dispatch the action that modify the raw in redux
			dispatch({ type: type.RAW_UPDATE, payload: formValues });
	}
};

export const rawFetch = (id) => async (dispatch) => {
	// fetch a raw
	const response = await db.collection(collection).doc({ id: id }).get();
	// dispatch the action to load that raw into redux
	dispatch({ type: type.RAW_FETCH, payload: response });
};

export const rawFetchAll = () => async (dispatch) => {
	// fetch all collection
	const response = await db.collection(collection).get();
	dispatch({ type: type.RAW_FETCH_ALL, payload: response });

	// dispatch the action to load all raws into redux
};

export const rawDelete = (id) => async (dispatch) => {
	// delete the raw with an specific id
	await db.collection(collection).doc({ id: id }).delete();

	// dispatch the action that modify the raw in redux
	dispatch({ type: type.RAW_DELETE, payload: id });
};
