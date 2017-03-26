import { List, fromJS } from 'immutable';
import _ from 'lodash';

const defaultOptions = fromJS({
  languagesSpoken: List(['en', 'pt', 'es']),
});

const addLanguage = (state, language) => {
  let languagesSpoken = state.get('languagesSpoken');

  if (!languagesSpoken.find(x => x === language)) {
    languagesSpoken = languagesSpoken.push(language);
  }

  return state.set('languagesSpoken', languagesSpoken);
};

const removeLanguage = (state, language) => {
  const languagesSpoken = state
    .get('languagesSpoken')
    .filter(x => x !== language);

  return state.set('languagesSpoken', languagesSpoken);
};

export default function reducer(state = defaultOptions, action) {
  switch (action.type) {
    case 'HANDLE_LANGUAGE_INPUT': {
      const entered = action.payload;
      return entered
        .split(' ')
        .filter(x => !_.isEmpty(x))
        .map(x => x.toLowerCase())
        .map(x => x.trim())
        .reduce((innerState, word) => {
          if (word.indexOf('-') === 0) {
            word = word.slice(1, word.length);
            return removeLanguage(innerState, word);
          }
          return addLanguage(innerState, word);
        }, state);
    }

    default:
      return state;
  }
}
