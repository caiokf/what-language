import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import settings from './settings.reducer';
import statistics from './statistics.reducer';
import colors from './colors.reducer';

export default combineReducers({
  settings,
  statistics,
  colors,
  routing: routerReducer,
});
