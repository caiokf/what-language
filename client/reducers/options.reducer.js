import { List, fromJS } from 'immutable';
import _ from 'lodash';
import languagesData from '../data/languages';

const defaultOptions = fromJS({
  languagesSpoken: List(['en', 'pt', 'es']),
  markCountriesByUnofficialLanguages: true,
});

const getLanguageCode = (language) => {
  let processedLanguage = language.trim().toLowerCase();

  if (_.isEmpty(processedLanguage)) {
    return '';
  }

  let found =
    languagesData.find(x => x.isoAlpha2 === processedLanguage) ||
    languagesData.find(x => x.isoAlpha3 === processedLanguage) ||
    languagesData.find(x => x.name.toLowerCase() === processedLanguage);

  if (found && found.isoAlpha2) {
    return found.isoAlpha2;
  }

  return '';
}

const addLanguage = (state, language) => {
  const languageCode = getLanguageCode(language);
  if (_.isEmpty(languageCode)) {
    return state;
  }

  let languagesSpoken = state.get('languagesSpoken');

  if (!languagesSpoken.find(x => x === languageCode)) {
    languagesSpoken = languagesSpoken.push(languageCode);
  }

  return state.set('languagesSpoken', languagesSpoken);
};

const removeLanguage = (state, language) => {
  const languageCode = getLanguageCode(language);
  const languagesSpoken = state
    .get('languagesSpoken')
    .filter(x => x !== languageCode);

  return state.set('languagesSpoken', languagesSpoken);
};

export default function reducer(state = defaultOptions, action) {
  switch (action.type) {
    case 'HANDLE_LANGUAGE_INPUT': {
      const entered = action.payload;
      return entered
        .split(' ')
        .filter(x => !_.isEmpty(x))
        .reduce((innerState, word) => {
          if (word.indexOf('-') === 0) {
            word = word.slice(1, word.length);
            return removeLanguage(innerState, word);
          }
          return addLanguage(innerState, word);
        }, state);
    }

    case 'UNOFFICIAL_LANGUAGES_OPTION': {
      return state.set('markCountriesByUnofficialLanguages', action.payload)
    }

    default:
      return state;
  }
}
