import * as type from './types';
import Localbase from 'localbase';
let db = new Localbase('db');

export const rawCreate = (formValues) => {
	// simple id auto increment
	formValues.id = Date.now();
	// post new rawMaterial
	db.collection('rawMaterials').add(formValues);
	// dispatch the action loading that raw into redux
	return { type: type.RAW_CREATE, payload: formValues };
};

export const rawRead = (id) => {
	// fetch a raw
	// dispatch the action to load that raw into redux
	return { type: type.RAW_READ, payload: 'raw fetched data' };
};

export const rawReadAll = () => {
	// fetch all raws
	// dispatch the action to load all raws into redux
	const data = [
		{
			id: 1,
			description: 'Flour',
			price: 200,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 2,
			description: 'Eggs',
			price: 250,
			unit: 'unit',
			amount: 30,
		},
		{
			id: 3,
			description: 'Apples',
			price: 100,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 4,
			description: 'Sugar',
			price: 70,
			unit: 'Kg',
			amount: 1,
		},
		{
			id: 5,
			description: 'Decorative Box',
			price: 120,
			unit: 'unit',
			amount: 1,
		},
	];
	return {
		type: type.RAW_READ_ALL,
		payload: data,
	};
};

export const rawUpdate = (id, formValues) => {
	// put the changes for the raw with an specific id
	// dispatch the action that modify the raw in redux
	return { type: type.RAW_UPDATE, payload: 'formValues' };
};

export const rawDelete = (id, formValues) => {
	// delete the raw with an specific id
	// dispatch the action that modify the raw in redux
	return { type: type.RAW_DELETE, payload: id };
};
