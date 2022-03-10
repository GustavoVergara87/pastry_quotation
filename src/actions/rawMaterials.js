import * as type from './types';
import Localbase from 'localbase';
let db = new Localbase('db');

export const rawCreateAndUpdate = (formValues) => {
	//Blank id => new value
	//Otherwise => update
	switch (formValues.id) {
		case '':
			// create a simple id auto increment
			formValues.id = Date.now();
			// post new rawMaterial
			db.collection('rawMaterials').add(formValues);
			// dispatch the action loading that raw into redux
			return { type: type.RAW_CREATE, payload: formValues };

		default:
			// put the changes for the raw with an specific id
			db
				.collection('rawMaterials')
				.doc({ id: formValues.id })
				.set(formValues);
			// dispatch the action that modify the raw in redux
			return { type: type.RAW_UPDATE, payload: formValues };
	}
};

export const rawRead = (id) => {
	// fetch a raw
	// dispatch the action to load that raw into redux
	return { type: type.RAW_READ, payload: 'raw fetched data' };
};

export const rawReadAll = () => async (dispatch) => {
	// fetch all rawMaterials
	const response = await db.collection('rawMaterials').get();
	dispatch({ type: type.RAW_READ_ALL, payload: response });

	// dispatch the action to load all raws into redux
};

export const rawDelete = (id, formValues) => {
	// delete the raw with an specific id
	// dispatch the action that modify the raw in redux
	return { type: type.RAW_DELETE, payload: id };
};
