import { Map } from 'immutable';

const defaultSettings = Map({
  settingsOpened: false,
});

export default function reducer(state = defaultSettings, action) {
  switch (action.type) {

    case 'OPEN_SETTINGS':
      return state.set('settingsOpened', true);

    case 'CLOSE_SETTINGS':
      return state.set('settingsOpened', false);

    default:
      return state;
  }
}
