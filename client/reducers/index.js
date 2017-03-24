import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import settings from './settings.reducer';
import user from './user.reducer';

export default combineReducers({
  settings,
  user,
  routing: routerReducer
});
