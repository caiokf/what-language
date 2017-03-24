import { Map, fromJS } from 'immutable';
import _ from 'lodash';
import countriesData from '../data/countries';

const defaultStatistics = fromJS({
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

    default:
      return calculateWorldStatistics(state);
  }
}

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
    }
  });

  return state
    .setIn(['canSpeakTo', 'people'], people)
    .setIn(['canSpeakTo', 'countries'], countries)
    .setIn(['canSpeakTo', 'languages'], languages)
    .set('mapData', world);
};
