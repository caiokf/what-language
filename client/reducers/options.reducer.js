import { List, fromJS } from 'immutable';

const defaultOptions = fromJS({
  languagesSpoken: List([ 'en', 'pt', 'es' ]),
});

export default function reducer(state = defaultOptions, action) {
  switch (action.type) {

    case 'ADD_SPOKEN_LANGUAGE': {
      const newLanguage = action.payload;
      const languagesSpoken = state
        .get('languagesSpoken')
        .push(newLanguage);

      return state.set('languagesSpoken', languagesSpoken);
    }

    case 'REMOVE_SPOKEN_LANGUAGE': {
      const languageToRemove = action.payload;
      const languagesSpoken = state
        .get('languagesSpoken')
        .filter(x => x !== languageToRemove);

      return state.set('languagesSpoken', languagesSpoken);
    }

    default:
      return state;
  }
}
