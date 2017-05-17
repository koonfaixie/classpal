import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from 'react-router-redux'
import { history } from './history'
import socketMiddleware from './socketMiddleware';

// import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducers from "./reducers";

let middleware = applyMiddleware(routerMiddleware(history), promise(), thunk , socketMiddleware);

export default createStore(
	reducers,
	middleware);