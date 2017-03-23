import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = applyMiddleware(thunk, logger());

export default createStore(reducers, middleware);
