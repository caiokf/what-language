import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import screens from './screens.reducer';
import statistics from './statistics.reducer';
import options from './options.reducer';
import colors from './colors.reducer';

export default combineReducers({
  screens,
  statistics,
  options,
  colors,
  routing: routerReducer,
});
