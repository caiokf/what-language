import { Map } from 'immutable';

const defaultSettings = Map({
  opened: false,
});

export default function reducer(state = defaultSettings, action) {
  switch (action.type) {

    case 'OPEN_SETTINGS':
      return state.set('opened', true);

    case 'CLOSE_SETTINGS':
      return state.set('opened', false);

    default:
      return state;
  }
}
