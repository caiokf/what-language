import { Map, List, fromJS } from 'immutable';
import _ from 'lodash';
import countriesData from '../data/countries';

const defaultStatistics = fromJS({
  languagesSpoken: List([ 'en', 'pt', 'es' ]),
  canSpeakTo: {
    people: 0,
    countries: 0,
    languages: 0,
  },
  world: {
    people: 0,
    countries: 0,
    languages: 0,
  },
  mapData: {},
});

export default function reducer(state = defaultStatistics, action) {
  switch (action.type) {

    case 'CALCULATE_STATISTICS': {
      return calculateStatistics(state, action.payload);
    }

    case 'CALCULATE_WORLD_STATISTICS': {
      return calculateWorldStatistics(state);
    }

    case 'ADD_SPOKEN_LANGUAGE': {
      const newLanguage = action.payload;
      const languagesSpoken = state
        .get('languagesSpoken')
        .push(newLanguage);

      const stateWithLanguageChange = state.set('languagesSpoken', languagesSpoken);

      return calculateStatistics(stateWithLanguageChange, languagesSpoken.toArray());
    }

    case 'REMOVE_SPOKEN_LANGUAGE': {
      const languageToRemove = action.payload;
      const languagesSpoken = state
        .get('languagesSpoken')
        .filter(x => x !== languageToRemove);

      const stateWithLanguageChange = state.set('languagesSpoken', languagesSpoken);

      return calculateStatistics(stateWithLanguageChange, languagesSpoken.toArray());
    }

    default:
      return calculateWorldStatistics(state);
  }
}

const calculateStatistics = (state, languagesSpoken) => {
  const world = {};
  let people = 0;
  let countries = 0;
  let languages = languagesSpoken.length;

  _.each(countriesData, country => {
    world[country.id] = country;

    if (_.intersection(languagesSpoken, country.languages).length > 0) {
      world[country.id].fillKey = 'canCommunicateTo';
      people += country.population;
      countries += 1;
    } else {
      world[country.id].fillKey = 'defaultFill';
    }
  });

  return state
    .setIn(['canSpeakTo', 'people'], people)
    .setIn(['canSpeakTo', 'countries'], countries)
    .setIn(['canSpeakTo', 'languages'], languages)
    .set('mapData', world);
};

const calculateWorldStatistics = (state) => {
  let people = _.sumBy(countriesData, x => x.population);
  let countries = _.size(countriesData);
  let languages = _
    .chain(countriesData)
    .flatMap(x => x.languages)
    .uniq()
    .size()
    .value();

  return state
    .setIn(['world', 'people'], people)
    .setIn(['world', 'countries'], countries)
    .setIn(['world', 'languages'], languages);
};
