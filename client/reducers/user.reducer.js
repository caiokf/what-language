import { Map, List } from 'immutable';

const defaultUser = Map({
  languagesSpoken: List([ 'en', 'pt', 'es' ]),
});

export default function reducer(state = defaultUser, action) {
  switch (action.type) {

    case 'ADD_SPOKEN_LANGUAGE': {
      const newLanguage = action.payload;
      const languagesSpoken = state.get('languagesSpoken');
      return state.set('languagesSpoken', languagesSpoken.push(newLanguage));
    }

    default:
      return state;
  }
}
