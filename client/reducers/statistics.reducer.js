import { fromJS } from 'immutable';
import _ from 'lodash';
import countriesJson from '../data/countries';

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
  countriesData: countriesJson,
});

export default function reducer(state = defaultStatistics, action) {
  switch (action.type) {

    case 'CALCULATE_STATISTICS': {
      const options = action.payload.options || {
        unofficial: false
      };

      const countriesData = state.get('countriesData').toJS();
      const world = {};
      const languagesSpoken = action.payload.languages;

      let people = 0;
      let countries = 0;
      let languages = languagesSpoken.length;

      _.each(countriesData, country => {
        world[country.id] = country;

        country.unofficialLanguages = country.unofficialLanguages || [];

        const markUnofficial = options.unofficial &&
          _.intersection(languagesSpoken, country.unofficialLanguages).length > 0;

        if (_.intersection(languagesSpoken, country.languages).length > 0) {
          world[country.id].fillKey = 'canCommunicateTo';
          people += country.population;
          countries += 1;
        } else if (markUnofficial) {
          world[country.id].fillKey = 'canCommunicateToUnofficially';
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
    }

    case 'CALCULATE_WORLD_STATISTICS':
    default: {
      const countriesData = state.get('countriesData').toJS();
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
    }
  }
}
