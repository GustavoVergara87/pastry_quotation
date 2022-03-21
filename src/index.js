import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

// const actionSanitizer = (action) =>
// 	action.type === '@@redux-form/INITIALIZE' && action.payload
// 		? { ...action, payload: '<<LONG_BLOB>>' }
// 		: action;

// const composeEnhancers =
// 	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// 		actionSanitizer,
// 		stateSanitizer: (state) =>
// 			state.product_image ? { ...state, data: '<<LONG_BLOB>>' } : state,
// 	}) || compose;
const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
