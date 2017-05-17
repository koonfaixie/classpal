import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Routes } from './routes';
import { getCookie } from './components/functions/CookieFunctions.js';
import { verifyToken } from "./actions/AccountActions.js"
import store from "./store.js";

function checkToken() {
    let jwt = getCookie('jwt');
    if (
        jwt
        && jwt !== undefined
        && jwt !== null
        && jwt !== 'undefined'
    ) {
        verifyToken(jwt)
	} else {
        store.dispatch({type: "INITIAL_CHECK_OK"})
    }
    // check token every 30 minutes
    setTimeout(checkToken, 1000 * 60 * 30);
};

checkToken()

ReactDOM.render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	document.getElementById('root')
)

