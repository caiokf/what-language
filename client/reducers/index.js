import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import settings from './settings.reducer';
import user from './user.reducer';
import statistics from './statistics.reducer';

export default combineReducers({
  settings,
  user,
  statistics,
  routing: routerReducer,
});
