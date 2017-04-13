import Immutable from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const stateAsObject = (state) => {
  const newState = {};

  Object.keys(state).forEach((x) => {
    if (Immutable.Iterable.isIterable(state[x])) {
      newState[x] = state[x].toJS();
    } else {
      newState[x] = state[x];
    }
  });

  return newState;
};

const immutableJsLogger = createLogger({
  stateTransformer: stateAsObject,
});

const loadState = () => {
  const savedState = localStorage.getItem('state');

  if (savedState === null) {
    return undefined;
  };

  const parsedState = JSON.parse(savedState);
  const newState = {
    options: Immutable.fromJS(parsedState.options),
    statistics: Immutable.fromJS(parsedState.statistics)
  };

  return newState;
};

const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch (err) {
    console.log(err)
  }
};

const middleware = applyMiddleware(thunk, immutableJsLogger);
const store = createStore(reducers, loadState(), middleware);

store.subscribe(() => {
  saveState({
    options: store.getState().options.toJS(),
    statistics: store.getState().statistics.toJS(),
  });
});

export default store;
