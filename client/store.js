import Immutable from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const immutableJsLogger = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    Object.keys(state).forEach((x) => {
      if (Immutable.Iterable.isIterable(state[x])) {
        newState[x] = state[x].toJS();
      } else {
        newState[x] = state[x];
      }
    });

    return newState;
  }
});

const middleware = applyMiddleware(thunk, immutableJsLogger);

export default createStore(reducers, middleware);
